const sourcesElement = document.querySelector("#sources #content")

const searchSourceElement = document.getElementById("search-source")
const addSourceElement = document.getElementById("add-source")

const syncElement = document.getElementById("sync")

var lastActiveSource
var lastSourceSearch

var contentTimeout

var noSourceSelected

async function contentHandler(){
    if (contentTimeout) clearTimeout(contentTimeout)

    const contentRaw = await fetch("/api/getContent", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            sourceID: lastActiveSource
        })
    })

    const content = await contentRaw.text()

    if (content != undefined){
        editorElement.value = content.trim()
    } 

    editorElement.addEventListener("input", (event) => {
        if (noSourceSelected) {
            event.preventDefault()
            return
        }
        
        const value = event.target.value
        const id = lastActiveSource

        syncElement.classList.replace("done", "working")


        if (contentTimeout) clearTimeout(contentTimeout)
        contentTimeout = setTimeout(async () => {
            if (noSourceSelected) return
            
            await fetch("/api/updateSourceContent", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    content: value,
                    sourceID: id
                })
            })
            syncElement.classList.replace("working", "done")
        }, 1000)
    })
}

function hashHex(hex) {
    if (!hex) return "null"
    const number = Number(hex)
    const hash = String(number).split("").map((char) => {
        const charNum = Number(char)
        return String.fromCharCode(charNum+65)
    })
    
    return hash.join("")
}

var searchTimeout
searchSourceElement.addEventListener("input", (event) => {
    const value = event.target.value

    if (searchTimeout) clearTimeout(searchTimeout)
    lastSourceSearch = value
    searchTimeout = setTimeout(() => {
        renderSources(lastActiveCategory, value)
    }, 250)

})

addSourceElement.onclick = async () => {
    if (noCategorySelected) return
    const value = searchSourceElement.value
    if (!value) return  

    searchSourceElement.value = ""
    

    await fetch("/api/addSource", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            sourceName: value,
            categoryID: lastActiveCategory
        })
    })

    renderSources(lastActiveCategory)
}




function clearSources() {
    sourcesElement.innerHTML = ""
    editorElement.value = ""
}

function addSource(name, id) {
    var sourceElement = document.createElement("div")
    sourceElement.classList.add("item")
    sourceElement.id = hashHex(id)
    sourceElement.nid = id

    var nameElement = document.createElement("name")
    nameElement.classList.add("name")
    nameElement.innerText = name

    var img = document.createElement("img")
    img.src = "/images/remove.svg"

    sourceElement.appendChild(nameElement)
    sourceElement.appendChild(img)

    sourcesElement.appendChild(sourceElement)

    sourceElement.onclick = async (event) => {
        if (event.target.tagName === "IMG") {
            await fetch("/api/removeSource", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    sourceID: id
                })
            })

            renderSources(lastActiveCategory, lastSourceSearch)
            return
        }
        activeSourceChange(id)
    }
}

function activeSourceChange(id) {
    const lastElement = sourcesElement.querySelector(`#${hashHex(lastActiveSource)}`)
    if (lastElement) {
        lastElement.classList.remove('active')
    }
    const currentElement = sourcesElement.querySelector(`#${hashHex(id)}`)
    if (currentElement) {
        currentElement.classList.add('active')

        lastActiveSource = id
        contentHandler()
    }
}

function updateActiveSources() {
    var activeSource = sourcesElement.querySelector(`#${hashHex(lastActiveSource)}`)
    
    if (!activeSource) activeSource = sourcesElement.firstElementChild
    if (!activeSource) {
        noSourceSelected = true
        editorElement.setAttribute("readonly", true)
        editorElement.classList.add("readonly")
        return
    }

    noSourceSelected = noCategorySelected

    editorElement.removeAttribute("readonly")
    editorElement.classList.remove("readonly")


    activeSourceChange(activeSource.nid)
}
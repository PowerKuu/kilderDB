const sourcesElement = document.querySelector("#sources #content")

const searchSourceElement = document.getElementById("search-source")
const addSourceElement = document.getElementById("add-source")

function hashHex(hex) {
    if (!hex) return "heloo"
    const number = Number(hex)
    const hash = String(number).split("").map((char) => {
        const charNum = Number(char)
        return String.fromCharCode(charNum+65)
    })
    
    return hash.join("")
}

searchSourceElement.addEventListener("input", (event) => {
    const value = event.target.value
    if (!value) {
        // Database show all
    }
    
    // Database search
    console.log(value)
})

addSourceElement.onclick = () => {
    const value = searchSourceElement.value
    if (!value) return  

    searchSourceElement.value = ""
    // Database add
    console.log(value)
}




function clearSources() {
    sourcesElement.innerHTML = ""
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

    sourceElement.onclick = (event) => {
        if (event.target.tagName === "IMG") {
            // Database remove

            return
        }
        activeSourceChange(id)
    }
}

var lastActiveSource

function activeSourceChange(id) {
    console.log(id)
    const lastElement = sourcesElement.querySelector(`#${hashHex(lastActiveSource)}`)
    if (lastElement) {
        lastElement.classList.remove('active')
    }
    const currentElement = sourcesElement.querySelector(`#${hashHex(id)}`)
    if (currentElement) {
        // Database get id data

        currentElement.classList.add('active')

        
        lastActiveSource = id
    }
}

function updateActiveSources() {
    var activeSource = sourcesElement.querySelector(`#${hashHex(lastActiveSource)}`)
    
    if (!activeSource) activeSource = sourcesElement.firstElementChild
    if (!activeSource) return

    activeSourceChange(activeSource.nid)
}
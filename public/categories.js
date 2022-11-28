const categoriesElement = document.querySelector("#categories #content")

const addCategoryElement = document.getElementById("add-category")
const searchCategoryElement = document.getElementById("search-category")

function hashHex(hex) {
    if (!hex) return "heloo"
    const number = Number(hex)
    const hash = String(number).split("").map((char) => {
        const charNum = Number(char)
        return String.fromCharCode(charNum+65)
    })
    
    return hash.join("")
}

searchCategoryElement.addEventListener("input", (event) => {
    const value = event.target.value
    if (!value) {
        // Database show all
    }
    
    // Database search
    console.log(value)
})

addCategoryElement.onclick = async () => {
    const value = searchCategoryElement.value
    if (!value) return  
    
    searchCategoryElement.value = ""

    await fetch("/api/addCategory", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            categoryName: value
        })
    })

    renderCategories()
}




function clearCategories() {
    categoriesElement.innerHTML = ""
}

function addCategory(name, id) {
    var categoryElement = document.createElement("div")
    categoryElement.classList.add("item")
    categoryElement.id = hashHex(id)
    categoryElement.nid = id

    var nameElement = document.createElement("name")
    nameElement.classList.add("name")
    nameElement.innerText = name

    var img = document.createElement("img")
    img.src = "/images/remove.svg"

    categoryElement.appendChild(nameElement)
    categoryElement.appendChild(img)

    categoriesElement.appendChild(categoryElement)

    categoryElement.onclick = async (event) => {
        if (event.target.tagName === "IMG") {
            await fetch("/api/removeCategory", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    categoryID: id,
                    "poop": "loop"
                })
            })

            renderCategories()
            return
        }
        activeCategoryChange(id)
    }
}

var lastActiveCategory

function activeCategoryChange(id) {
    const lastElement = categoriesElement.querySelector(`#${hashHex(lastActiveCategory)}`)
    if (lastElement) {
        lastElement.classList.remove('active')
    }
    const currentElement = categoriesElement.querySelector(`#${hashHex(id)}`)
    if (currentElement) {
        // Database get id data

        currentElement.classList.add('active')
        
        lastActiveCategory = id
    }
}

function updateActiveCategories() {
    var activeCategory = categoriesElement.querySelector(`#${hashHex(lastActiveCategory)}`)
    
    if (!activeCategory) activeCategory = categoriesElement.firstElementChild
    if (!activeCategory) return

    activeCategoryChange(activeCategory.nid)
}
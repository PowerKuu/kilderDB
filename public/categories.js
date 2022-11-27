const categoriesElement = document.querySelector("#categories #content")

const addCategoryElement = document.getElementById("add-category")
const searchCategoryElement = document.getElementById("search-category")

searchCategoryElement.addEventListener("input", (event) => {
    const value = event.target.value
    if (!value) {
        // Database show all
    }
    
    // Database search
    console.log(value)
})

addCategoryElement.onclick = () => {
    const value = searchCategoryElement.value
    if (!value) return  

    searchCategoryElement.value = ""
    // Database add
    console.log(value)
}




function clearCategories() {
    categoriesElement.innerHTML = ""
}

function addCategory(name, id) {
    var categoryElement = document.createElement("div")
    categoryElement.classList.add("item")
    categoryElement.id = id

    var nameElement = document.createElement("name")
    nameElement.classList.add("name")
    nameElement.innerText = name

    var img = document.createElement("img")
    img.src = "/images/remove.svg"

    categoryElement.appendChild(nameElement)
    categoryElement.appendChild(img)

    categoriesElement.appendChild(categoryElement)

    categoryElement.onclick = (event) => {
        if (event.target.tagName === "IMG") {
            // Database remove

            return
        }
        activeCategoryChange(id)
    }
}

var lastActiveCategory

function activeCategoryChange(id) {
    const lastElement = categoriesElement.querySelector(`#${lastActiveCategory}`)
    if (lastElement) {
        lastElement.classList.remove('active')
    }
    const currentElement = categoriesElement.querySelector(`#${id}`)
    if (currentElement) {
        // Database get id data

        currentElement.classList.add('active')
        
        lastActiveCategory = id
    }
}

function updateActiveCategories() {
    var activeCategory = categoriesElement.querySelector(`#${lastActiveCategory}`)
    
    if (!activeCategory) activeCategory = categoriesElement.firstElementChild
    if (!activeCategory) return

    activeCategoryChange(activeCategory.id)
}

addCategory("hello", "helloss")
addCategory("hello", "hellosvs")
addCategory("hsello", "hellocsvs")
updateActiveCategories()
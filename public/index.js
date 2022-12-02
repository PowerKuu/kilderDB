const editorElement = document.getElementById("editor")
const toggleElement = document.getElementById("toggle")
const markdownElement = document.getElementById("markdown")

const converter = new showdown.Converter()

async function renderSources(id, search){
    if (noCategorySelected) return
    
    var sourcesRaw

    if (!search || search == "") {
        sourcesRaw = await fetch("/api/getSources", {
            method: "POST",

            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({
                categoryID: id
            })
        })
    } else {
        sourcesRaw = await fetch("/api/searchSources", {
            method: "POST",
            
            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({
                search: search,
                categoryID: id
            })
        })
    }

    const sources = await sourcesRaw.json()

    clearSources()

    if (!sources || sources.lenght < 1) return

    for (var source of sources){
        addSource(source.name, source.id)
    }

    await updateActiveSources()
}

async function renderCategories(search = undefined){
    var categoriesRaw

    if (!search || search == "") {
        categoriesRaw = await fetch("/api/getCategories", {
            method: "POST"
        })
    } else {
        categoriesRaw = await fetch("/api/searchCategories", {
            method: "POST",
            
            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({
                search
            })
        })
    }

    const categories = await categoriesRaw.json()


    clearCategories()

    if (!categories || categories.lenght < 1) {
        return
    }

    for (var category of categories){
        addCategory(category.name, category.id)
    }

    await updateActiveCategories()
}


var enableMarkdown = true

function toggleMarkdown(){
    if (noSourceSelected || noCategorySelected) return

    if (enableMarkdown) {
        editorElement.style.display = "none"
        markdownElement.style.display = "block"

        toggleElement.innerHTML = "Editor"
    } else {
        editorElement.style.display = "block"
        markdownElement.style.display = "none"

        toggleElement.innerHTML = "Markdown"
    }
}

toggleElement.addEventListener("click", () => {
    enableMarkdown = !enableMarkdown
    toggleMarkdown()
})

renderCategories().then(async () => {
    toggleMarkdown()
})
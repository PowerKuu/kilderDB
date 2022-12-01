const editorElement = document.getElementById("editor")
const toggleElement = document.getElementById("toggle")
const markdownElement = document.getElementById("markdown")

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

    updateActiveSources()
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

    updateActiveCategories()
}


var enableMarkdown = false
function toggleMarkdown(){
    if (noSourceSelected || noCategorySelected) return
    enableMarkdown = !enableMarkdown

    if (enableMarkdown) {
        
    } else {

    }
}

renderCategories()
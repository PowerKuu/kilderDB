async function renderSources(){

}

async function renderCategories(){
    const categoriesRaw = await fetch("/api/getCategories", {
        method: "POST"
    })

    const categories = await categoriesRaw.json()

    if (!categories || categories.lenght < 1) return

    clearCategories()
    for (var category of categories){
        addCategory(category.name, category.id)
    }

    updateActiveCategories()
}


renderCategories()
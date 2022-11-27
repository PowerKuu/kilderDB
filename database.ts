import GqlClient from "@klevn/gql-client"


const gql = new GqlClient({
    url: "http://localhost:8080/graphql",
}, {
    getCategories: `
    query getCategories {
        queryCategory {
          id
          name
        }
    }
    `,

    addCategory: `
    mutation addCategory ($name: String!) {
        addCategory(input: {name: $name sources: []}) {
        category {
          id
        }
      }
    }    
    `,

    removeCategory: `
    mutation removeCategories ($categoryIDS: [ID!]) {
        deleteCategory(filter: {id: $categoryIDS}) {
          category {
            id
          }
        }
    }
    `,



    getSources: `

    `,

    addSource: `

    `,

    updateSourceContent: `

    `,

    removeSource: `
    
    `
})


interface Category {
    name: string
    id: string
}

type Categories = Category[]

interface Source {
    name: string
    id: string

    content: string
}

type Sources = CategSourceory[]



async function getCategories(): Categories {

}

async function addCategory(category: Category): boolean {

}

async function removeCategory(categoryID: string): boolean{

}




async function getSources(categoryID: string): Sources{

}

async function addSource(categoryID: string, source: Source): boolean {

}

async function updateSourceContent(sourceID: string, content:string): boolean {

}

async function removeSource(sourceID: string): boolean{
    
}
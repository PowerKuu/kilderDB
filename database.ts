import GqlClient from "@klevn/gql-client"


const gql = new GqlClient({
    url: "http://localhost:8080/graphql",
}, {
  getCategories: `query getCategories {
    queryCategory {
      id
      name
    }
  }`,

  addCategory: `mutation addCategory ($categoryName: String!) {
    addCategory(input: {name: $categoryName sources: []}) {
      category {
        id
      }
    }
  }`,

  removeCategory: `mutation removeCategory ($categoryID: ID!) {
    deleteCategory(filter: {id: [$categoryID]}) {
      category {
        id
      }
    }
  }`,






  getSources: `query getSources($categoryID: ID!) {
    getCategory(id: $categoryID) {
      sources {
        id,
        name,
        content
      }
    }
  }`,

  addSource: `mutation addSource($categoryID: ID!, $sourceName: String!) {
    addSource(input: {category: {id: $categoryID}, name: $sourceName, content: ""}){
      source {
        id
      }
    }
  }`,

  updateSourceContent: `mutation updateSourceContent($sourceID: ID!, $content: String!) {
    updateSource(input: { filter: {id: [$sourceID]} set: {content: $content}}){
      source {
        id
      }
    }
  }`,

  removeSource: `mutation removeSource($sourceID: ID!) {
    deleteSource(filter: {id: [$sourceID]}) {
      source {
        id
      }
    }
  }`
})


interface Category {
  name: string
}

type Categories = Category[]

interface Source {
    name: string
    content: string

    categoryID: string
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

async function addSource(source: Source): boolean {

}

async function updateSourceContent(sourceID: string, content:string): boolean {
  
}

async function removeSource(sourceID: string): boolean{
    
}
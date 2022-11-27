import GqlClient from "@klevn/gql-client"

const GQL = {
    hello: `
    query ($pass: String!){
        todoHistoryByPassword(password: $pass) {
            _id
        }
    }
    `,

    world: `
    query ($pass: String!){
        todoHistoryByPassword(password: $pass) {
            _id
        }
    }
    `
}


const gql = new GqlClient({
    url: "https://graphql.eu.fauna.com/graphql",
}, GQL)


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

async function addCategory(category: Category):boolean {

}

async function removeCategory(categoryID: string): boolean{

}




async function getSources(categoryID: string): Sources{

}

async function addSource(categoryID: string, source: Source):boolean {

}

async function updateSourceContent(categoryID: string, sourceID: string, content:string):boolean {

}

async function removeSource(categoryID: string, sourceID: string): boolean{
    
}
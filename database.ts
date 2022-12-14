import GqlClient from "@klevn/gql-client"


const gql = new GqlClient({
    url: "http://localhost:8080/graphql",
}, "./database/query.graphql")


interface Category {
  id: String

  name: string
}

type Categories = Category[]

interface Source {
  id: String

  name: string
  content: string

  categoryID: string
}

type Sources = Source[]



export async function getCategories(): Promise<Categories|null> {
  const rawData = await gql.run("getCategories") 
  const data = rawData?.queryCategory

  return data as Categories
}

export async function addCategory(categoryName: String): Promise<boolean> {
  const rawData = await gql.run("addCategory", {
    categoryName
  }) 

  const data = Boolean(rawData?.addCategory?.category?.[0]?.id)

  return data
}

export async function removeCategory(categoryID: string): Promise<boolean> {
  const rawData = await gql.run("removeCategory", {
    categoryID
  })

  const data = Boolean(rawData?.deleteCategory?.category?.[0]?.id)

  return data
}

export async function searchCategories(search:string): Promise<Categories|null>{
  const rawData = await gql.run("searchCategories", {
    regexpName: `/${search}.*/`
  })


  const data = rawData?.queryCategory

  return data
}




export async function getSources(categoryID: string): Promise<Sources|null> {
  const rawData = await gql.run("getSources", {
    categoryID
  })

  const data = rawData?.getCategory?.sources

  return data
}

export async function getContent(sourceID: string): Promise<string|null> {
  const rawData = await gql.run("getContent", {
    sourceID
  })
  const data = rawData?.getSource?.content

  return data
}

export async function addSource(categoryID: string, sourceName:string): Promise<boolean> {
  const rawData = await gql.run("addSource", {
    categoryID, 
    sourceName
  })

  const data = Boolean(rawData?.addSource?.source?.[0]?.id)

  return data
}


export async function updateSourceContent(sourceID: string, content:string): Promise<Boolean|null> {
  const rawData = await gql.run("updateSourceContent", {
    sourceID, 
    content
  })

  const data = rawData?.updateSource?.source?.[0]?.content == content

  return data
}

export async function removeSource(sourceID: string): Promise<boolean> {
  const rawData = await gql.run("removeSource", {
    sourceID
  })

  const data = Boolean(rawData?.deleteSource?.source?.[0]?.id)

  return data
}

export async function searchSources(categoryID:string, search: string): Promise<Sources|null> {
  const rawData = await gql.run("searchSources", {
    categoryID,
    regexpName: `/${search}.*/`
  })

  const data = rawData?.getCategory?.sources

  return data
}
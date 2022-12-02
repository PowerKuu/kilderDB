import express, { Express, Request, Response } from "express"
import path from "path"

import * as database from "./database"

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")))

const lenght = {
    name: 20,
    content: 20
}

app.get("/ping", async (req: Request, res: Response) => {
    res.send("KildeDB - V1")
})


app.post("/api/addCategory", async (req: Request, res: Response) => {
    const name = req.body.categoryName

    if (!name || name.lenght > lenght.name) {
        res.sendStatus(401)
        return
    }

    const db = await database.addCategory(name)
    if (db) res.sendStatus(200)
    else res.sendStatus(400)
})

app.post("/api/addSource", async (req: Request, res: Response) => {
    const name = req.body.sourceName

    if (!name || name.lenght > lenght.name) {
        res.sendStatus(401)
        return
    }
    
    const db = await database.addSource(req.body.categoryID, name)
    if (db) res.sendStatus(200)
    else res.sendStatus(400)
})

app.post("/api/getCategories", async (req: Request, res: Response) => {
    const db = await database.getCategories()
    if (db) res.json(db)
    else res.sendStatus(400)
})


app.post("/api/getSources", async (req: Request, res: Response) => {
    const db = await database.getSources(req.body.categoryID)
    if (db) res.json(db)
    else res.sendStatus(400)
})

app.post("/api/getContent", async (req: Request, res: Response) => {
    const db = await database.getContent(req.body.sourceID)
    if (db) res.send(db)
    else res.send("")
})

app.post("/api/removeCategory", async (req: Request, res: Response) => {
    const db = await database.removeCategory(req.body.categoryID)

    if (db) res.sendStatus(200)
    else res.sendStatus(400)
})

app.post("/api/removeSource", async (req: Request, res: Response) => {
    const db = await database.removeSource(req.body.sourceID)
    if (db) res.sendStatus(200)
    else res.sendStatus(400)
})

app.post("/api/updateSourceContent", async (req: Request, res: Response) => {
    const content = req.body.content

    if (!content || content.lenght > lenght.content) {
        res.sendStatus(401)
        return
    }
    
    const db = await database.updateSourceContent(req.body.sourceID, content)
    if (db) res.send(db)
    else res.sendStatus(400)
})



app.post("/api/searchCategories", async (req: Request, res: Response) => {
    const name = req.body.search

    if (!name || name.lenght > lenght.name) {
        res.sendStatus(401)
        return
    }
    
    const db = await database.searchCategories(name)
    if (db) res.json(db)
    else res.sendStatus(400)
})


app.post("/api/searchSources", async (req: Request, res: Response) => {
    const name = req.body.search

    if (!name || name.lenght > lenght.name) {
        res.sendStatus(401)
        return
    }

    const db = await database.searchSources(req.body.categoryID, name)
    if (db) res.json(db)
    else res.sendStatus(400)
})


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
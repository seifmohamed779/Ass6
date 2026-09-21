import dns from "dns"
dns.setServers(["8.8.8.8", "1.1.1.1"])
import "dotenv/config"
import express from "express"
import {
    add,
    addBooks,
    addLog,
    createAuthors,
    createBooks,
    createLogs,
    deleteBooksBeforeYear,
    excludeGenres,
    findBookByTitle,
    findBooksByGenre,
    findBooksByYear,
    findBooksWithIntegerYear,
    skipLimitBooks,
    updateBook,
    aggregate2,
    aggregate3,
    aggregate4
} from "./module/book.service.js"

import productController from "./module/product/product.controller.js"
import { testDBconnection } from "./DB/connection.db.js"

const app = express()

const port = 3000

app.use(express.json())

app.use("/product", productController)

app.post("/collection/books", createBooks)
app.post("/collection/authors", createAuthors)
app.post("/collection/logs/capped", createLogs)
app.post("/books", add)
app.post("/books/batch", addBooks)
app.post("/logs", addLog)
app.patch("/books/Future", updateBook)
app.get("/books/title", findBookByTitle)
app.get("/books/year", findBooksByYear)
app.get("/books/genre", findBooksByGenre)
app.get("/books/skip-limit", skipLimitBooks)
app.get("/books/year-integer", findBooksWithIntegerYear)
app.get("/books/exclude-genres", excludeGenres)
app.delete("/books/before-year", deleteBooksBeforeYear)
app.get("/books/aggregate2", aggregate2)
app.get("/books/aggregate3", aggregate3)
app.get("/books/aggregate4", aggregate4)

await testDBconnection()

app.listen(port, () => {
    console.log(`example is on ${port}`)
})
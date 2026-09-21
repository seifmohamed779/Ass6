import { db } from "../DB/connection.db.js"
export async function createBooks(req, res) {
    try {
        const db = mongoose.connection.db
        await db.createCollection("books", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            bsonType: "string",
                            minLength: 1
                        }
                    }
                }
            }
        })
        res.json({
            ok: true
        })
    } catch (error) {
        console.log({ error })
        res.json({
            ok: false
        })
    }
}
export async function createAuthors(req, res) {
    try {
        const { Name, nationality } = req.body

        await db.collection("authors").insertOne({
            Name,
            nationality
        })

        res.json({message:"sucess"})
    } catch (error) {
        console.log({ error })
    }
}

export async function createLogs(req, res) {
    try {
        await db.createCollection("logs", {
            capped: true,
            size: 1024 * 1024
        })
        res.json({
            ok: true
        })
    } catch (error) {
        console.log({ error })
        res.json({
            ok: false,
            error: error.message
        })
    }
}
export async function add(req,res) {
    try{
        const{title,author,year,genres}=req.body
        await db.collection("books").insertOne({
            title,
            author,
            year,
            genres
        })
        res.json({
            ok: true
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function addBooks(req,res) {
    try {
        const books=req.body
        if (books.length<3) {
            return res.status(400).json({
                message: "You must send at least 3 books"
            })
        }
        await db.collection("books").insertMany(books)
        res.json({
            ok: true
        })
    } catch (error) {
        console.log({error})
    }
}
export async function addLog(req, res) {
    try {
        const log = req.body
        await db.collection("logs").insertOne(log)
        res.json({
            ok: true
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function updateBook(req, res) {
    try {
        const result = await db.collection("books").updateOne(
            {
                title: "Future"
            },
            {
                $set: {
                    year: 2022
                }
            }
        )
        res.json({
            ok: true,
            result
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function findBookByTitle(req, res) {
    try {
        const {title}=req.query
        const book = await db.collection("books").findOne({
            title
        })
        res.json({
            ok:true,
            book
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function findBooksByYear(req, res) {
    try {
        const { from, to } = req.query

        const books = await db.collection("books").find({
            year: {
                $gte: Number(from),
                $lte: Number(to)
            }
        }).toArray()
        res.json({
            ok: true,
            books
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function findBooksByGenre(req, res) {
    try {
        const { genre } = req.query
        const books = await db.collection("books").find({
            genres: {
                $regex: genre,
                $options: "i"
            }
        }).toArray()
        res.json({
            ok: true,
            books
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function skipLimitBooks(req, res) {
    try {
        const books = await db.collection("books")
            .find({})
            .sort({ year: -1 })
            .skip(2)
            .limit(3)
            .toArray()
        res.json({
            ok: true,
            books
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function findBooksWithIntegerYear(req, res) {
    try {
        const books = await db.collection("books").find({
            year: {
                $type: "int"
            }
        }).toArray()

        res.json({
            ok: true,
            books
        })
    } catch (error) {
        console.log({error})
    }
}
export async function excludeGenres(req, res) {
    try {
        const books = await db.collection("books").find({
            genres: {
                $nin: ["Horror", "Science Fiction"]
            }
        }).toArray()

        res.json({
            ok: true,
            books
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function deleteBooksBeforeYear(req, res) {
    try {
        const { year } = req.query

        const result = await db.collection("books").deleteMany({
            year: {
                $lt: Number(year)
            }
        })
        res.json({
            ok: true,
            deletedCount: result.deletedCount
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function aggregate2(req, res) {
    try {
        const books = await db.collection("books").aggregate([
            {
                $match: {
                    year: { $gt: 2000 }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    author: 1,
                    year: 1
                }
            }
        ]).toArray()
        res.json({
            ok: true,
            books
        })
    } catch (error) {
        console.log({ error })
    }
}
export async function aggregate3(req, res) {
    try {
        const books = await db.collection("books").aggregate([
            {
                $unwind: "$genres"
            }
        ]).toArray()

        res.json({
            ok: true,
            books
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }
}
export async function aggregate4(req, res) {
    try {
        const books = await db.collection("books").aggregate([
            {
                $lookup: {
                    from: "logs",
                    localField: "book_id",
                    foreignField: "_id",
                    as: "book_details"
                }
            }
        ]).toArray()
        res.json({
            ok: true,
            books
        })
    } catch (error) {
        console.log({ error })
    }}



   //q16
export async function aggregate1(req, res, next) {
    try {
        const books = await Book.aggregate([
            {
                $match: {
                    year: {
                        $gt: 2000
                    }
                }
            },
            {
                $sort: {
                    year: -1
                }
            }
        ]);
        res.json(books);
    } catch (error) {
        console.log({error});
    }
}
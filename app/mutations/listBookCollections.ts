import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async () => {
  // This will retrieve all book collections from the database
  const data = await db.bookCollection.findMany({
    include: {
      books: {
        include: {
          book: true,
        },
      },
    },
  })

  return data.map((c) => ({ ...c, books: c.books.map((b) => b.book) }))
})

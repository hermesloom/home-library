import db from "./index"

const seed = async () => {
  // Create book collections
  const fictionCollection = await db.bookCollection.create({
    data: { name: "Fiction Classics" },
  })

  const dystopianCollection = await db.bookCollection.create({
    data: { name: "Dystopian Fiction" },
  })

  const americanLitCollection = await db.bookCollection.create({
    data: { name: "American Literature" },
  })

  const twentiethCenturyCollection = await db.bookCollection.create({
    data: { name: "20th Century Novels" },
  })

  // Create books and associate them with collections

  // Book 1: To Kill a Mockingbird
  await db.book.create({
    data: {
      title: "To Kill a Mockingbird",
      author: "Lee, Harper",
      year: 1960,
      images: [
        "https://dummyimage.com/300x450/e8e8e8/444444.png&text=Book+1+Cover",
        "https://dummyimage.com/600x900/e8e8e8/444444.png&text=Book+1+Detail",
      ],
      description: "A novel about racial inequality and moral growth in the American South.",
      collections: {
        create: [
          { collection: { connect: { id: fictionCollection.id } } },
          { collection: { connect: { id: americanLitCollection.id } } },
          { collection: { connect: { id: twentiethCenturyCollection.id } } },
        ],
      },
    },
  })

  // Book 2: 1984
  await db.book.create({
    data: {
      title: "1984",
      author: "Orwell, George",
      year: 1949,
      images: [
        "https://dummyimage.com/300x450/e8e8e8/444444.png&text=Book+2+Cover",
        "https://dummyimage.com/600x900/e8e8e8/444444.png&text=Book+2+Detail",
      ],
      description: "A dystopian social science fiction novel and cautionary tale.",
      collections: {
        create: [
          { collection: { connect: { id: dystopianCollection.id } } },
          { collection: { connect: { id: twentiethCenturyCollection.id } } },
        ],
      },
    },
  })

  // Book 3: The Great Gatsby
  await db.book.create({
    data: {
      title: "The Great Gatsby",
      author: "Fitzgerald, F. Scott",
      year: 1925,
      images: [
        "https://dummyimage.com/300x450/e8e8e8/444444.png&text=Book+3+Cover",
        "https://dummyimage.com/600x900/e8e8e8/444444.png&text=Book+3+Detail",
      ],
      description: "A novel about the American Dream and the Roaring Twenties.",
      collections: {
        create: [
          { collection: { connect: { id: fictionCollection.id } } },
          { collection: { connect: { id: americanLitCollection.id } } },
          { collection: { connect: { id: twentiethCenturyCollection.id } } },
        ],
      },
    },
  })

  // Book 4: Brave New World
  await db.book.create({
    data: {
      title: "Brave New World",
      author: "Huxley, Aldous",
      // Year intentionally omitted to demonstrate handling of missing years
      images: [
        "https://dummyimage.com/300x450/e8e8e8/444444.png&text=Book+4+Cover",
        "https://dummyimage.com/600x900/e8e8e8/444444.png&text=Book+4+Detail",
      ],
      description:
        "A dystopian novel written in 1931 that anticipates developments in reproductive technology, sleep-learning, and psychological manipulation.",
      collections: {
        create: [
          { collection: { connect: { id: dystopianCollection.id } } },
          { collection: { connect: { id: twentiethCenturyCollection.id } } },
        ],
      },
    },
  })

  // Book 5: The Catcher in the Rye
  await db.book.create({
    data: {
      title: "The Catcher in the Rye",
      author: "Salinger, J.D.",
      year: 1951,
      images: [
        "https://dummyimage.com/300x450/e8e8e8/444444.png&text=Book+5+Cover",
        "https://dummyimage.com/600x900/e8e8e8/444444.png&text=Book+5+Detail",
      ],
      description:
        "A novel depicting the teenage protagonist's experiences in New York City, themes of alienation and identity.",
      collections: {
        create: [
          { collection: { connect: { id: americanLitCollection.id } } },
          { collection: { connect: { id: twentiethCenturyCollection.id } } },
        ],
      },
    },
  })

  // Book 6: Of Mice and Men
  await db.book.create({
    data: {
      title: "Of Mice and Men",
      author: "Steinbeck, John",
      year: 1937,
      images: [
        "https://dummyimage.com/300x450/e8e8e8/444444.png&text=Book+6+Cover",
        "https://dummyimage.com/600x900/e8e8e8/444444.png&text=Book+6+Detail",
      ],
      description:
        "A novella telling the story of two displaced migrant ranch workers moving from place to place in California during the Great Depression.",
      collections: {
        create: [
          { collection: { connect: { id: fictionCollection.id } } },
          { collection: { connect: { id: americanLitCollection.id } } },
          { collection: { connect: { id: twentiethCenturyCollection.id } } },
        ],
      },
    },
  })
}

export default seed

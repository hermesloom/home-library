export interface Book {
  id: number
  title: string
  author: string
  year: number | null
  images: string[]
  description: string
}

export interface BookCollection {
  id: number
  name: string
  books: Book[]
  createdAt: Date
  updatedAt: Date
}

"use client"

import { useState, useMemo, useEffect } from "react"
import { invoke } from "@blitzjs/rpc"
import { BookModal } from "@/components/book-modal"
import { Book, BookCollection } from "@/types"
import { Footer } from "@/components/footer"
import { ChevronDown, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import listBookCollections from "@/app/mutations/listBookCollections"

// Sort types
type SortOption = "title" | "author" | "year"

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("title")

  // Collection state
  const [collections, setCollections] = useState<BookCollection[]>([])
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load collections on initial render
  useEffect(() => {
    const loadCollections = async () => {
      try {
        setIsLoading(true)
        const collectionsData = await invoke(listBookCollections, {})
        setCollections(collectionsData)

        // Select the first collection by default if available
        if (collectionsData.length > 0) {
          setSelectedCollectionId(collectionsData[0].id)
        }
      } catch (error) {
        console.error("Failed to load collections:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCollections()
  }, [])

  // Get books from the selected collection or use sample data if no collection
  const books = useMemo(() => {
    if (!collections.length) return []

    const selectedCollection = collections.find((c) => c.id === selectedCollectionId)
    return selectedCollection?.books || []
  }, [collections, selectedCollectionId])

  // Get currently selected collection name
  const selectedCollectionName = useMemo(() => {
    if (!selectedCollectionId) return "All Books"
    const collection = collections.find((c) => c.id === selectedCollectionId)
    return collection?.name || "All Books"
  }, [collections, selectedCollectionId])

  // Sort books based on selected criteria
  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => {
      switch (sortBy) {
        case "title":
          if (!a.title) return b.title ? 1 : 0
          if (!b.title) return -1
          return a.title.localeCompare(b.title)
        case "author":
          if (!a.author) return b.author ? 1 : 0
          if (!b.author) return -1
          return a.author.localeCompare(b.author)
        case "year":
          // Handle undefined years - place them at the end
          if (a.year === null) return 1
          if (b.year === null) return -1
          return a.year - b.year
        default:
          return 0
      }
    })
  }, [books, sortBy])

  const openBookModal = (book: Book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium">Loading books...</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col">
      <div className="container px-4 py-8 md:py-12 mx-auto flex-grow">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 mb-4">
            {process.env.NEXT_PUBLIC_LIBRARY_NAME}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mb-6">
            {process.env.NEXT_PUBLIC_LIBRARY_SUBTITLE}
          </p>

          <div className="bg-card border rounded-lg p-4 md:p-6 max-w-2xl mx-auto text-sm md:text-base">
            <p className="mb-4">{process.env.NEXT_PUBLIC_LIBRARY_DESCRIPTION}</p>
            <p className="font-medium">
              If you would like to lend out a book, please contact{" "}
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_LIBRARY_EMAIL}`}
                className="text-primary hover:underline"
              >
                {process.env.NEXT_PUBLIC_LIBRARY_EMAIL}
              </a>
            </p>
          </div>
        </header>

        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold">Available Books</h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Collection selector dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-1.5 text-sm w-full sm:w-auto justify-between"
                  >
                    <span className="truncate">{selectedCollectionName}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Book Collections</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {collections.length > 0 ? (
                    collections.map((collection) => (
                      <DropdownMenuItem
                        key={collection.id}
                        className={
                          selectedCollectionId === collection.id
                            ? "bg-accent text-accent-foreground"
                            : ""
                        }
                        onClick={() => setSelectedCollectionId(collection.id)}
                      >
                        {collection.name} ({collection.books.length})
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>No collections available</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-1.5 text-sm w-full sm:w-auto justify-between"
                  >
                    {sortBy === "title" && "Sort by Title"}
                    {sortBy === "author" && "Sort by Author"}
                    {sortBy === "year" && "Sort by Year"}
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Sort Books By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className={sortBy === "title" ? "bg-accent text-accent-foreground" : ""}
                    onClick={() => setSortBy("title")}
                  >
                    Title
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={sortBy === "author" ? "bg-accent text-accent-foreground" : ""}
                    onClick={() => setSortBy("author")}
                  >
                    Author
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={sortBy === "year" ? "bg-accent text-accent-foreground" : ""}
                    onClick={() => setSortBy("year")}
                  >
                    Publication Year
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {sortedBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {sortedBooks.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-background"
                  onClick={() => openBookModal(book)}
                >
                  <div className="w-full">
                    <img
                      src={book.images[0]}
                      alt={book.title}
                      className="w-full aspect-[2/3] object-cover"
                    />
                  </div>
                  <div className="p-2 md:p-3">
                    <h3 className="font-semibold text-xs md:text-sm line-clamp-1">{book.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                    {book.year ? (
                      <p className="text-xs text-muted-foreground mt-0.5">{book.year}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-0.5 italic">Unknown year</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No books available in this collection.</p>
              {collections.length > 1 && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    if (collections.length > 0) {
                      setSelectedCollectionId(collections[0].id)
                    }
                  }}
                >
                  View Another Collection
                </Button>
              )}
            </div>
          )}
        </section>
      </div>

      <Footer />

      {selectedBook && (
        <BookModal book={selectedBook} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

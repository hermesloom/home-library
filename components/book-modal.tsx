"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Book } from "@/types"

// Import Lightbox components
import Lightbox from "yet-another-react-lightbox"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Counter from "yet-another-react-lightbox/plugins/counter"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "yet-another-react-lightbox/plugins/counter.css"

interface BookModalProps {
  book: Book
  isOpen: boolean
  onClose: () => void
}

export function BookModal({ book, isOpen, onClose }: BookModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Reset image index when dialog opens or book changes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
    }
  }, [isOpen, book.id])

  // Format images for the lightbox
  const slides = book.images.map((src) => ({ src }))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <DialogTitle className="text-xl font-bold pr-8">{book.title}</DialogTitle>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="space-y-6 pt-4">
          <div className="relative w-full overflow-hidden rounded-md bg-muted">
            <div className="min-h-[300px] py-4 flex items-center justify-center cursor-pointer">
              <img
                src={book.images[currentImageIndex]}
                alt={`${book.title}`}
                className="max-h-[40vh] w-auto object-contain"
                onClick={() => document.getElementById("open-lightbox")?.click()}
              />

              {/* Hidden button to trigger lightbox */}
              <Button
                id="open-lightbox"
                className="hidden"
                onClick={() => {
                  const lightboxElement = document.querySelector(".yarl__root")
                  if (lightboxElement) {
                    ;(lightboxElement as HTMLElement).style.zIndex = "100"
                  }
                }}
              >
                Open
              </Button>

              <Lightbox
                slides={slides}
                open={false} // We'll use our own button to control opening
                index={currentImageIndex}
                controller={{ closeOnBackdropClick: true }}
                on={{
                  view: ({ index }) => setCurrentImageIndex(index),
                  exited: () => {
                    const lightboxElement = document.querySelector(".yarl__root")
                    if (lightboxElement) {
                      ;(lightboxElement as HTMLElement).style.zIndex = "-1"
                    }
                  },
                }}
                plugins={[Thumbnails, Zoom, Counter]}
                thumbnails={{
                  position: "bottom",
                  width: 60,
                  height: 60,
                }}
                styles={{
                  container: { backgroundColor: "rgba(0, 0, 0, .8)" },
                  thumbnail: { borderRadius: "4px" },
                }}
              />
            </div>

            {/* Simple thumbnail selection below main image */}
            {book.images.length > 1 && (
              <div className="flex gap-2 justify-center mt-2 pb-4">
                {book.images.map((img, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 overflow-hidden rounded-md border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-primary scale-110"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{book.author}</p>
                {book.year ? (
                  <p className="text-sm text-muted-foreground">{book.year}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Publication year unknown</p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{book.description}</p>

            <div className="flex justify-center mt-4">
              <Button variant="outline">
                <a
                  href={`mailto:library@luttmissen.org?subject=Book%20Request:%20${encodeURIComponent(
                    book.title
                  )}`}
                >
                  Request Book
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

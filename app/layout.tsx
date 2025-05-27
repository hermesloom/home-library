import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { BlitzProvider } from "./blitz-client"
import "./globals.css"
import { redirect } from "next/navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title:
    `${process.env.NEXT_PUBLIC_LIBRARY_SUBTITLE} | ${process.env.NEXT_PUBLIC_LIBRARY_NAME}` ||
    "home-library",
  description:
    process.env.NEXT_PUBLIC_LIBRARY_SUBTITLE ||
    "A minimalist self-hosted web application for displaying books you own for lending them out.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Unconditionally redirect to Google Sheets
  redirect(
    "https://docs.google.com/spreadsheets/d/138opT8IcW6DUSAvA3A5Kb5Pg4bgEtltXHFO1l13s--E/edit"
  )

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BlitzProvider>{children}</BlitzProvider>
      </body>
    </html>
  )
}

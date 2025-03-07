"use client"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin } from "@blitzjs/rpc"

export const { withBlitz, BlitzProvider } = setupBlitzClient({
  plugins: [BlitzRpcPlugin({})],
})

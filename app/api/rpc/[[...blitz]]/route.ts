import { rpcAppHandler } from "@blitzjs/rpc"
import { withBlitzAuth } from "@/app/blitz-server"

export const { GET, HEAD, POST } = withBlitzAuth(rpcAppHandler())

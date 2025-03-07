import { setupBlitzServer } from "@blitzjs/next"
import { BlitzLogger } from "blitz"
import { RpcServerPlugin } from "@blitzjs/rpc"

const { api, invoke } = setupBlitzServer({
  plugins: [RpcServerPlugin({})],
  logger: BlitzLogger({}),
})

export { api, invoke }

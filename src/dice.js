// This version uses a static file server for unknown routes.

// Try this with
// http://localhost:8000/
// http://localhost:8000/api/test?myParam=abc

// Import the the Application and Router classes from the Oak module
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"

// Import the createExitSignal function from the JS+OAI shared library
import { createExitSignal, staticServer } from "./shared/server.ts"

// Create an instance of the Application and Router classes
const app = new Application()
const router = new Router()

// Configure a cutom route
// This function will run when "/api/test" is requested
router.get("/api/test", (ctx) => {
    console.log("someone made a request to /api/test")
    ctx.response.headers.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type")

    // send a response back to the browser
    ctx.response.body = Math.floor(Math.random() * 6) + 1
})

router.get("/api/d6", (ctx) => {
    console.log("someone made a request to /api/d6")
    ctx.response.headers.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type")
    // output some info about the request
    const randomNumber = Math.floor(Math.random() * 6) + 1

    // send a response back to the browser
    ctx.response.body = randomNumber
})
// Tell the app to use the router
app.use(router.routes())
app.use(router.allowedMethods())

// Try serving undefined routes with static files
app.use(staticServer)

// Everything is set up, let's start the server
console.log("\nListening on http://localhost:8000")
await app.listen({ port: 8000, signal: createExitSignal() })

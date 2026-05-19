import express from "express"
import connectDB from "./config/connectDB.js"
import config from "./config/config.js"
import todosRoutes from "./routes/todos.routes.js"
const app = express()
app.use (express.json())
connectDB()
// Todos API
app.use("/api/todos", todosRoutes)
// Server
app.listen(config.PORT ,()=>{
    console.log(`Server Is UP and Running on PORT : ${config.PORT}`)
})
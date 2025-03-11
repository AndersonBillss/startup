import express from 'express';
import cors from 'cors'
import { apiRoutes } from "./routes/api.routes.js";
import cookieParser from "cookie-parser"

const port = 4000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true}))

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
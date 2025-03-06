import express from 'express';
import cors from 'cors'
import { apiRoutes } from "./routes/api.routes.js";

const port = 3000
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
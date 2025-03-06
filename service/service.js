import express from 'express';
import { apiRoutes } from "./routes/api.routes.js";

const port = 3000
const app = express()


app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
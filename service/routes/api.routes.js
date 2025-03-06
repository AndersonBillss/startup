import { Router } from 'express';
export const apiRoutes = Router();

apiRoutes.get("/ping", (req, res) => {
    res.send({msg: "Api routes working"})
})
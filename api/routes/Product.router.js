import express from 'express'
import * as Productcontroller from '../controller/Product.controller.js'
const router =express.Router()

router.post("/save",Productcontroller.save)
router.get("/fetch",Productcontroller.fetch)
export default router;
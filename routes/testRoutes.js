import express from "express";
import { testaPostController } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

//define router object 
const router = express.Router();


//route 
router.post("/testPost", userAuth, testaPostController);


//export the router
export default router;

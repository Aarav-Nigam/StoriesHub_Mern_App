import express from "express";
import { signin,signup,exists} from "../controllers/users.js";
const router=express.Router();

router.post('/signin',signin)
router.post('/signup',signup)
router.get('/exist/:id',exists)

export default router;
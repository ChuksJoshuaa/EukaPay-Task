import express from "express";
import { signin, signup } from "../controllers/User";

const router = express();

router.post("/login", signin);
router.post("/register", signup);

export default router;
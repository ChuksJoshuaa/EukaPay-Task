import { signin, signup } from "@controllers/User";
import express from "express";

const router = express();

router.post("/login", signin);
router.post("/register", signup);

export default router;
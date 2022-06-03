import { Router } from "express";
import register from "./register";
import login from "./login";
import admin from "./admin";
import user from "./user";

const router = Router();
router.post("/register", register);
router.get("/login", login);
router.use("/admin", admin);
router.use("/user", user);

export default router;

import { Router } from "express";
import register from "./register";
import login from "./login";
import restAuth from "../../services/restAuth";
import admin from "./admin";
import user from "./user";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.use("/admin", admin);
router.use("/user", user);

export default router;

import { Router } from "express";
import restAuth from "../../../services/restAuth";
import usersWorktimes from "./usersWorktimes";
import userWorktimes from "./userWorktimes";

const router = Router();
router.post("/users-worktimes", restAuth, usersWorktimes);
router.post("/user-worktimes", restAuth, userWorktimes);

export default router;

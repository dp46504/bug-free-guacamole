import { Router } from "express";
import restAuth from "../../../services/restAuth";
import usersWorktimes from "./usersWorktimes";
import userWorktimes from "./userWorktimes";
import searchUsers from "./searchUsers";

const router = Router();
router.get("/users-worktimes", restAuth, usersWorktimes);
router.get("/user-worktimes", restAuth, userWorktimes);
router.get("/search-users", restAuth, searchUsers);

export default router;

import { Router } from "express";
import restAuth from "../../../services/restAuth";
import usersWorktimes from "./usersWorktimes";
import userWorktimes from "./userWorktimes";
import searchUsers from "./searchUsers";

const router = Router();
router.post("/users-worktimes", restAuth, usersWorktimes);
router.post("/user-worktimes", restAuth, userWorktimes);
router.post("/search-users", restAuth, searchUsers);

export default router;

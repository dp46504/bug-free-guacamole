import { Router } from "express";
import startWorkDay from "./startWorkDay";
import restAuth from "../../../services/restAuth";
import dayInfo from "./dayInfo";

const router = Router();
router.post("/start-workday", restAuth, startWorkDay);
router.post("/day-info", restAuth, dayInfo);

export default router;

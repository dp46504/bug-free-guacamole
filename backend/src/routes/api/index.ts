import { Router } from "express";
import register from './register';
import login from './login';
import startWorkDay from "./startWorkDay";
import restAuth from "../../services/restAuth";

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/start-workday', restAuth, startWorkDay);

export default router;
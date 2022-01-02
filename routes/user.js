import express  from "express";
import { signin,signup ,fetchUsers} from "../controllers/user.js";

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.get('/all',fetchUsers)
export default router;
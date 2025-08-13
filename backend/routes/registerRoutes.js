import { Router } from "express";
import { registerIndividual } from "../controllers/registerController.js";
import { sanitizeBody} from "../middleware/sanitize.js";

const router = Router();

// POST /api/register/individual
router.post(
  "/individual",
  sanitizeBody,       
  registerIndividual   
);

export default router;
import { Router } from "express";
import { registerIndividual } from "../controllers/registerController.js";
import { registerTeam } from "../controllers/teamController.js";
import { sanitizeBody} from "../middleware/sanitize.js";
import { individualRegistrationLimiter, teamRegistrationLimiter } from "../middleware/rateLimit.js";

const router = Router();

// Individual registration
router.post(
  "/individual",
  individualRegistrationLimiter,
  sanitizeBody,       
  registerIndividual   
);

// Team registration
router.post(
  "/team",
  teamRegistrationLimiter,
  sanitizeBody,       
  registerTeam   
);

export default router;
import { Router } from "express";
import { check } from "express-validator";
import {
  createContact,
  getContacts,
  replyContact,
} from "../Controllers/Contact.Controller.js";
import multer from "multer";
const upload = multer();
const router = Router();
// Initialize multer for parsing multipart/form-data
router.get("/contact", getContacts);
router.post(
  "/contact",
  upload.none(), // Use multer to parse form data without file uploads
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("mobile").notEmpty().withMessage("Mobile number is required"),
    check("subject").notEmpty().withMessage("Subject is required"),
    check("message").notEmpty().withMessage("Message is required"),
  ],
  createContact,
);

router.put(
  "/contact/:id",
  upload.none(), // Use multer to parse form data without file uploads
  [check("reply").notEmpty().withMessage("Reply is required")],
  replyContact,
);

export default router;

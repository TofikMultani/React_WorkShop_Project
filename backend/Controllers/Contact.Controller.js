import Contact from "../Model/Contact.js";
import { validationResult } from "express-validator";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .select(
        "name email mobile subject message createdAt status reply reply_date",
      )
      .sort({ createdAt: -1 });
    res.status(200).json({ data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error while fetching contacts" });
  }
};

export const createContact = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Validation failed" });
  }

  try {
    const { name, fullname, email, mobile, subject, message } = req.body;

    const newContact = new Contact({
      name: name || fullname,
      email,
      mobile,
      subject,
      message,
    });

    await newContact.save();
    res
      .status(201)
      .json({ message: "Message sent successfully", data: newContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Server error while creating contact" });
  }
};

export const replyContact = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Validation failed" });
  }

  try {
    const { id } = req.params;
    const { reply } = req.body;

    const existingContact = await Contact.findById(id);
    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updateContact = await Contact.findByIdAndUpdate(
      id,
      {
        reply,
        status: "Replied",
        reply_date: Date.now(),
        updatedAt: Date.now(),
      },
      { new: true },
    ).select(
      "name email mobile subject message createdAt status reply reply_date",
    );

    return res.status(200).json({
      message: "Reply sent successfully",
      data: updateContact,
    });
  } catch (error) {
    console.error("Error replying to contact:", error);
    res.status(500).json({ message: "Server error while replying to contact" });
  }
};

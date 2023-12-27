const Contact = require("../models/contact");

const { HttpError, ctrlWrap } = require("../helpers");

class AuthController {
  register = ctrlWrap(async (req, res) => {
    const { _id: owner } = req.user;
    const { favorite, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const contactList = { owner };
    if (favorite) {
      contactList.favorite = favorite;
    }

    const contacts = await Contact.find(
      contactList,
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).exec();
    res.status(200).send({ code: 200, contacts, qty: contacts.length });
  });

  getById = ctrlWrap(async (req, res) => {
    const contact = await Contact.findById(
      req.params.contactId,
      "-createdAt -updatedAt"
    ).exec();
    if (!contact) {
      throw HttpError(404);
    }
    res.send(contact);
  });

  add = ctrlWrap(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      throw HttpError(400);
    }

    const result = await Contact.findOne({ name }).exec();
    if (result) {
      throw HttpError(409, `Contact ${name} already exists`);
    }

    const { _id: owner } = req.user;
    const contact = await Contact.create({ ...req.body, owner });

    res.status(201).send({ code: 201, contact });
  });

  remove = ctrlWrap(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(
      req.params.contactId
    ).exec();
    if (!contact) {
      throw HttpError(404);
    }
    res.send({ code: 200, message: "contact deleted" });
  });

  updateByID = ctrlWrap(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    ).exec();
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).send({ code: 200, contact });
  });

  updateStatusContact = ctrlWrap(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    ).exec();
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).send({ code: 200, contact });
  });
}

module.exports = new ContactsController();

const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join("db", "contacts.json");

// функция выводит в консоль список контактов (возвращает массив)
function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

// функция выводит в консоль контакт по id (возвращает объект)
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts.filter((item) => item.id === contactId));
    })
    .catch((err) => console.log(err.message));
}

// функция удаляет контакт по id (возвращает объект)
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContactsList = contacts.filter((item) => item.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newContactsList))
        .then(() =>
          console.log(`contact ${contactId} was successfully removed`)
        )
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
}

// функция удаляет контакт
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = { id: shortid.generate(), name, email, phone };
      const newContactsList = [...contacts, newContact];
      fs.writeFile(contactsPath, JSON.stringify(newContactsList))
        .then(() => console.log(`contact ${name} was successfully added`))
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

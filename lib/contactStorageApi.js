/**
 * Imports
 */

import { createContact } from './helpers';

/**
 * Storage API
 */

export const contactsStorageApi = {
    getAll: function() {
        const contactJson = localStorage.getItem('contacts');
        return contactJson ? JSON.parse(contactJson) : [];
        
    },

    saveAll: function(contacts) {
        const serializedContacts = JSON.stringify(contacts);
        localStorage.setItem('contacts', serializedContacts);
    },

    add: function(contact) {
        const contacts = this.getAll();
        contacts.push(contact);
        this.saveAll(contacts);
    },

    create: function(name, vacancy, phone) {
        const contact = createContact(name, vacancy, phone);

        return contact;
    },

    remove: function(id) {
        const contacts = this.getAll();
        const filteredContacts = 
            contacts.filter(contact => contact.id !== id);
        this.saveAll(filteredContacts);
    },

    clearAll: function() {
        localStorage.removeItem('contacts');
    }
}
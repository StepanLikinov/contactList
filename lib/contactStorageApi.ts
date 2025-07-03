/**
 * Imports
 */

import { createContact } from './helpers';
import { Contact, ContactsStorageApi } from './types';

/**
 * Storage API
 */

export const contactsStorageApi: ContactsStorageApi = {
    getAll: function(): Contact[] {
        const contactJson = localStorage.getItem('contacts');
        return contactJson ? JSON.parse(contactJson) : [];
        
    },

    saveAll: function(contacts:Contact[]): void {
        const serializedContacts = JSON.stringify(contacts);
        localStorage.setItem('contacts', serializedContacts);
    },

    add: function(contact: Contact): void {
        const contacts = this.getAll();
        contacts.push(contact);
        this.saveAll(contacts);
    },

     create: function(name: string, vacancy: string, phone: string): Contact {
        const contact = createContact(name, vacancy, phone);

        return contact;
    },

    remove: function(id: string): void {
        const contacts = this.getAll();
        const filteredContacts = 
            contacts.filter(contact => contact.id !== id);
        this.saveAll(filteredContacts);
    },

    clearAll: function(): void {
        localStorage.removeItem('contacts');
    }
}
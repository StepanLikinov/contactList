/**
 * Imports
 */

import { v4 as uuidv4 } from 'uuid';
import { Contact, ValidationResult } from '../types/interfaces';

/**
 * Helpers
 */

const generateId = (): string => {
    let id: string = uuidv4();

    return id;
};

const createContact = (
    name: string,
    vacancy: string,
    phone: string,
): Contact => {
    return {
        id: generateId(),
        name: name.trim(),
        vacancy: vacancy.trim(),
        phone: phone.trim(),
    };
};

const getCountByLetter = (contacts: Contact[]): Record<string, number> => {
    const map: Record<string, number> = {};
    contacts.forEach((contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!map[firstLetter]) map[firstLetter] = 0;
        map[firstLetter]++;
    });

    return map;
};

function validateTextInput(value: string): ValidationResult {
    const trimmed = value.trim();
    const regex = /^[a-zA-Z\s-]+$/;

    if (!trimmed) return { valid: false, message: 'Empty Input' };
    if (!regex.test(trimmed))
        return { valid: false, message: 'Only letters allowed' };

    return { valid: true };
}

function validatePhoneInput(value: string): ValidationResult {
    const trimmed = value.trim();
    const regex = /^\+\d{1}\d{3}\d{3}\d{2}\d{2}$/;

    if (!trimmed) return { valid: false, message: 'Empty Input' };
    if (!regex.test(trimmed))
        return { valid: false, message: 'Invalid phone format' };

    return { valid: true };
}

/**
 * Exports
 */

export {
    generateId,
    validatePhoneInput,
    validateTextInput,
    createContact,
    getCountByLetter,
};

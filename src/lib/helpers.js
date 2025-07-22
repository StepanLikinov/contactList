/**
 * Imports
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * Helpers
 */

const generateId = () => {
    let id = uuidv4();

    return id;
};

const createContact = (name, vacancy, phone) => {
    return {
        id: generateId(),
        name: name.trim(),
        vacancy: vacancy.trim(),
        phone: phone.trim(),
    };
};

// function getFirstLetter(contact) {
//     return contact.name[0].toUpperCase();
// }

/**
 * Validations
 */

// function showInputError($input, $error, message) {
//     const originalPlaceholder = $input.getAttribute('placeholder');
//     $input.classList.add('invalid');
//     $input.value = '';
//     $input.placeholder = message;
//     $error.classList.remove('hidden');

//     setTimeout(() => {
//         $input.classList.remove('invalid');
//         $error.classList.add('hidden');
//         $input.placeholder = originalPlaceholder;
//     }, 2000);
// }

const getCountByLetter = (contacts) => {
    const map = {};
    contacts.forEach((contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!map[firstLetter]) map[firstLetter] = 0;
        map[firstLetter]++;
    });
    return map;
};

function validateTextInput(value) {
    const trimmed = value.trim();
    const regex = /^[a-zA-Z\s-]+$/;

    if (!trimmed) return { valid: false, message: 'Empty Input' };
    if (!regex.test(trimmed))
        return { valid: false, message: 'Only letters allowed' };

    return { valid: true };
}

function validatePhoneInput(value) {
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
    // showInputError,
    validatePhoneInput,
    validateTextInput,
    createContact,
    // getFirstLetter,
    getCountByLetter,
};

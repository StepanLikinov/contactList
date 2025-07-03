/**
 * Imports
 */

import { v4 as uuidv4 } from '../node_modules/uuid/dist/esm-browser/index'

/**
 * Helpers
 */

const generateId = () => {
    let id = uuidv4();

    return id;
}

const createContact = (name, vacancy, phone) => {
    return {
        id: generateId(),
        name: name.trim(),
        vacancy: vacancy.trim(),
        phone: phone.trim(),
    };
}

function getFirstLetter(contact) {
    return contact.name[0].toUpperCase();
}

/**
 * Validations
 */

function showInputError($input, $error, message) {

    const originalPlaceholder = $input.getAttribute('placeholder');
    $input.classList.add('invalid');
    $input.value = '';
    $input.placeholder = message;
    $error.classList.remove('hidden');

    setTimeout(() => {
        $input.classList.remove('invalid');
        $error.classList.add('hidden');
        $input.placeholder = originalPlaceholder;
    }, 2000);
}

function validateTextInput($input, $error) {
    const value = $input.value.trim();
    const textRegex = /^[a-zA-Z\s-]+$/;

    if (value === '') {
        showInputError($input, $error, 'Empty Input');
        return false;
    }

    if (!textRegex.test(value)) {
        showInputError($input, $error, 'Only letters allowed');
        return false;
    }

    return true;
}

function validatePhoneInput($input, $error) {
    const value = $input.value.trim();
    const phoneRegex = /^\+\d{1}\d{3}\d{3}\d{2}\d{2}$/;

    if (value === '') {
        showInputError($input, $error, 'Empty Input');
        return false;
    }

    if (!phoneRegex.test(value)) {
        showInputError($input, $error, 'Invalid phone format');
        return false;
    }

    return true;
}

/**
 * Exports
 */

export { 
    generateId, showInputError, validatePhoneInput, 
    validateTextInput, createContact, getFirstLetter 
};

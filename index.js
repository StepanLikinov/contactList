/**
 * Imports
 */

import './style.css';
import { renderLetterGroups } from "./lib/renders";
import { contactsDomApi } from "./lib/contactsDomApi";
import { contactsStorageApi } from "./lib/contactStorageApi";

/**
 * Nodes
 */

const $addButton = document.querySelector('.search-section__button--add');
const $clearButton = document.querySelector('.search-section__button--clear');
const $searchModal = document.getElementById('search-modal');
const $searchInput = document.getElementById('search-input');
const $searchButton = document.querySelector('.search-section__button--search');
const $searchClose = document.getElementById('search-close');

/**
 * Main
 */

document.addEventListener('DOMContentLoaded', () => {
    renderLetterGroups();
    contactsDomApi.render();
    contactsDomApi.init();

    $addButton.addEventListener('click', () => {
        contactsDomApi.add()
    });
    
    $clearButton.addEventListener('click', () => {
        contactsStorageApi.clearAll();
        contactsDomApi.resetAllCounters();
        contactsDomApi.render();
    });

    $searchButton.addEventListener('click', () => {
        $searchModal.classList.add('show');
        $searchInput.value = '';
        contactsDomApi.renderSearchResults([]);
        $searchInput.focus();
    });

    $searchClose.addEventListener('click', () => {
        $searchModal.classList.remove('show');
    });

    $searchInput.addEventListener('input', () => {
        const query = $searchInput.value.trim().toLowerCase();
        if (query === '') {
            contactsDomApi.renderSearchResults([]);
            return;
        }

        const contacts = contactsStorageApi.getAll();
        const results = contacts.filter(contact =>
            contact.name.toLowerCase().startsWith(query)
        );

        contactsDomApi.renderSearchResults(results);
    });
})
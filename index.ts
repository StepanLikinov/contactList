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

const $addButton: HTMLButtonElement | null = 
    document.querySelector('.search-section__button--add');
const $clearButton: HTMLButtonElement | null = 
    document.querySelector('.search-section__button--clear');
const $searchModal: HTMLElement | null = 
    document.getElementById('search-modal');
const $searchInput: HTMLElement | null = 
    document.getElementById('search-input');
const $searchButton: HTMLButtonElement | null = 
    document.querySelector('.search-section__button--search');
const $searchClose: HTMLElement | null = 
    document.getElementById('search-close');

/**
 * Main
 */

document.addEventListener('DOMContentLoaded', () => {
    renderLetterGroups();
    contactsDomApi.render();
    contactsDomApi.init();

    if ($addButton) {
        $addButton.addEventListener('click', () => {
            contactsDomApi.add();
        });
    }
    
    if ($clearButton) {
        $clearButton.addEventListener('click', () => {
            contactsStorageApi.clearAll();
            contactsDomApi.resetAllCounters();
            contactsDomApi.render();
        });
    }

    if ($searchButton) {
        $searchButton.addEventListener('click', () => {
            if ($searchModal) {
                $searchModal.classList.add('show');
            }
            if ($searchInput instanceof HTMLInputElement) {
                $searchInput.value = '';
                contactsDomApi.renderSearchResults([]);
                $searchInput.focus();
            }
        });
    }

    if ($searchClose) {
        $searchClose.addEventListener('click', () => {
            if ($searchModal) {
                $searchModal.classList.remove('show');
            }
        });
    }

    if ($searchInput instanceof HTMLInputElement) {
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
    }
})
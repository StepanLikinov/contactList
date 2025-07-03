/**
 * Imports
 */

import { contactsStorageApi } from "./contactStorageApi";
import { Contact, ContactsDomApi } from './types';
import { 
    validateTextInput, 
    validatePhoneInput, 
    getFirstLetter 
} from "./helpers";

/**
 * Nodes
 */

const $name: HTMLElement | null = 
    document.querySelector('.search-section__input--name');
const $vacancy: HTMLElement | null = 
    document.querySelector('.search-section__input--vacancy');
const $phone: HTMLElement | null = 
    document.querySelector('.search-section__input--phone');

const $error: HTMLElement | null = document.querySelector('.error');
const $editModal: HTMLElement | null = document.getElementById('edit-modal');
const $editForm: HTMLElement | null = document.getElementById('edit-form');
const $nameInput: HTMLElement | null = document.getElementById('edit-name');

const $vacancyInput: HTMLElement | null = 
    document.getElementById('edit-vacancy');

const $phoneInput: HTMLElement | null = document.getElementById('edit-phone');
const $editCancel: HTMLElement | null = document.getElementById('edit-cancel');

const $searchModal: HTMLElement | null = 
    document.getElementById('search-modal');
const $searchInput: HTMLElement | null = 
    document.getElementById('search-input');

/**
 * Contact DOM API
 */

export const contactsDomApi: ContactsDomApi = {
    getLetterGroups: function(): NodeListOf<Element> {
        return document.querySelectorAll('.letter-group');
    },
    getCountsGroups: function(): NodeListOf<Element> {
        return document.querySelectorAll('.letter-group__count');
    },

    add: function(): void {
        if (!($name instanceof HTMLInputElement) || 
            !($vacancy instanceof HTMLInputElement) || 
            !($phone instanceof HTMLInputElement) || 
            !$error
        ) {
            console.error('Required input elements not found or invalid');
            return;
        }

        const isNameValid = validateTextInput($name, $error);
        const isVacancyValid = validateTextInput($vacancy, $error);
        const isPhoneValid = validatePhoneInput($phone, $error);

        if (isNameValid && isVacancyValid && isPhoneValid ) {
            const contact = 
                contactsStorageApi.create(
                    $name.value.trim(), 
                    $vacancy.value.trim(), 
                    $phone.value.trim()
                );
            contactsStorageApi.add(contact);

            $name.value = '';
            $vacancy.value = '';
            $phone.value = '';
            
            this.render();
            
            console.log('Contact saved:', contact);
        }
    },

    remove: function(id: string): void {
        contactsStorageApi.remove(id);
        this.render();
    },

    render: function(): void {
        const groups = this.getLetterGroups();
        groups.forEach(group => {
            const contactsContainer = 
                group.querySelector('.letter-group__contacts');
            if (contactsContainer) {
                contactsContainer.innerHTML = '';
            } else {
                console.warn('render: contactsContainer not found for group', group);
            }
        });

        this.resetAllCounters();

        const contacts = contactsStorageApi.getAll();
        contacts.forEach(contact => {
            const letterLower = getFirstLetter(contact).toLowerCase();
            const $group = 
                document.querySelector(
                    `.letter-group[data-id="${letterLower}"]`
                );
            if (!$group) {
                return;
            }

            const template = document.querySelector('#contact-template');
            if (!(template instanceof HTMLTemplateElement)) {
                return;
            }

            const contactClone = 
                template.content.cloneNode(true) as DocumentFragment;

            const $contactCard = contactClone.querySelector('.contact-card');
            if (!$contactCard) {
                return;
            }

            $contactCard.setAttribute('data-id', contact.id);

            const nameEl = 
                contactClone.querySelector('.contact-card__name');
            if (nameEl) {
                nameEl.textContent = `Name: ${contact.name}`;
            }

            const vacancyEl = 
                contactClone.querySelector('.contact-card__vacancy');
            if (vacancyEl) {
                vacancyEl.textContent = `Vacancy: ${contact.vacancy}`
            }

            const phoneEl = 
                contactClone.querySelector('.contact-card__phone');
            if (phoneEl) {
                phoneEl.textContent = `Phone: ${contact.phone}`;
            }

            const $removeButton = 
                $contactCard.querySelector('.contact-card__delete');
            if ($removeButton) {
                $removeButton.addEventListener('click', () => {
                    this.remove(contact.id);
                });
            }

            const $editButton = 
                $contactCard.querySelector('.contact-card__edit');
            if ($editButton) {
                $editButton.addEventListener('click', () => {
                    this.openEditModal(contact);
                });
            }

            const contactsContainer = 
                $group.querySelector('.letter-group__contacts');
            if (contactsContainer) {
                contactsContainer.appendChild(contactClone);
            } else {
                console.warn('render: contactsContainer not found for group', $group);
            }

            this.updateCounter(getFirstLetter(contact), 1);
        })
    },

    init: function(): void {
        let letterGroups = this.getLetterGroups();

        letterGroups.forEach($group => {
            const $header = $group.querySelector('.letter-group__header');
            if ($header) {
                $header.addEventListener('click', () => {
                    const contactsContainer = 
                        $group.querySelector('.letter-group__contacts');
                    if (contactsContainer) {
                        contactsContainer.classList.toggle('open');
                    }
                });
            }
        });
    },

    updateCounter: function(letter: string, delta: number): void {
        const letterLower = letter.toLowerCase();

        const $group = 
            document.querySelector(`.letter-group[data-id="${letterLower}"]`);
        if (!$group) return;

        const $count = $group.querySelector('.letter-group__count');
        if (!$count) return;

    let currentCount = Number.parseInt($count.textContent || '0', 10);
        currentCount += delta;

        if (currentCount < 0) currentCount = 0;

        $count.textContent = currentCount.toString();

        if (currentCount === 0) {
            $count.classList.add('hidden');
        } else {
            $count.classList.remove('hidden');
        }
    },

    updateAllCounters: function(): void {
        let groups = this.getCountsGroups();
        groups.forEach(($group) => {
            if ($group.textContent === '0') {
                $group.classList.add('hidden');
            } else {
                $group.classList.remove('hidden');
            }
        })
    },

    resetAllCounters: function(): void {
        let groups = this.getCountsGroups();
        groups.forEach($count => {
            $count.textContent = '0';
            $count.classList.add('hidden');
        });
    },

    openEditModal: function(
            contact: Contact, currentSearchQuery: string = ''
        ): void {
            if (!($nameInput instanceof HTMLInputElement) || 
                !($vacancyInput instanceof HTMLInputElement) || 
                !($phoneInput instanceof HTMLInputElement) || 
                !$editModal || 
                !$editForm || 
                !$editCancel || 
                !$error || 
                !$searchModal) {
                console.error('Modal elements missing or invalid');
                return;
            }

            $nameInput.value = contact.name;
            $vacancyInput.value = contact.vacancy;
            $phoneInput.value = contact.phone;

            $editModal.classList.add('show');

            const onSubmit = (event: Event) => {
                event.preventDefault();
                
                const isNameValid = validateTextInput($nameInput, $error);
                const isVacancyValid = validateTextInput($vacancyInput, $error);
                const isPhoneValid = validatePhoneInput($phoneInput, $error);

                if (!isNameValid || !isVacancyValid || !isPhoneValid) {
                    return;
                }

                const updatedContact = {
                    ...contact,
                    name: $nameInput.value.trim(),
                    vacancy: $vacancyInput.value.trim(),
                    phone: $phoneInput.value.trim(),
                };

                const contacts = contactsStorageApi.getAll();
                const updatedContacts = contacts.map(
                    storedContact => storedContact.id === contact.id 
                    ? updatedContact 
                    : storedContact
                );

                contactsStorageApi.saveAll(updatedContacts);

                this.render();

                if ($searchModal.classList.contains('show')) {
                    const query = currentSearchQuery.toLowerCase();
                    const filtered = updatedContacts.filter(
                        contact => contact.name.toLowerCase().startsWith(query)
                    );
                    this.renderSearchResults(filtered);
                }

                $editModal.classList.remove('show');
                $editForm.removeEventListener('submit', onSubmit);
            }
            $editForm.addEventListener('submit', onSubmit);
        
            $editCancel.onclick = () => {
                $editModal.classList.remove('show');
                $editForm.removeEventListener('submit', onSubmit);
            }
    },

    renderSearchResults: function(results: Contact[]): void {
        const $searchResults: HTMLElement | null = 
            document.getElementById('search-results');
        if (!$searchResults) {
            return;
        }

        $searchResults.innerHTML = '';
        
        if (results.length === 0) {
            $searchResults.innerHTML = '<li>No contacts found</li>';
            return;
        }

        results.forEach(contact => {
            const $foundContact = document.createElement('li');
            $foundContact.innerHTML = `
                <div class="contact-info">
                    <div><strong>Name:</strong> ${contact.name}</div>
                    <div><strong>Vacancy:</strong> ${contact.vacancy}</div>
                    <div><strong>Phone:</strong> ${contact.phone}</div>
                </div>
                <div class="contact-actions">
                    <button class="contact-card__edit">✎</button>
                    <button class="contact-card__delete">✖</button>
                </div>
            `;

            const $deleteButton = 
                $foundContact.querySelector('.contact-card__delete');
            const $editButton = 
                $foundContact.querySelector('.contact-card__edit');

            if($deleteButton) {
                $deleteButton.addEventListener('click', () => {
                    this.remove(contact.id);
                    $foundContact.remove();
                });
            } 

            if ($editButton) {
                $editButton.addEventListener('click', () => {
                    if ($searchInput instanceof HTMLInputElement) {
                        const currentQuery = $searchInput.value.trim();
                        this.openEditModal(contact, currentQuery);
                    }
                });
            }

            $searchResults.appendChild($foundContact);
        });
    }
}    
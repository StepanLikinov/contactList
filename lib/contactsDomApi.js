/**
 * Imports
 */

import { contactsStorageApi } from "./contactStorageApi";
import { 
    validateTextInput, 
    validatePhoneInput, 
    getFirstLetter 
} from "./helpers";

/**
 * Nodes
 */

const $name = document.querySelector('.search-section__input--name');
const $vacancy = document.querySelector('.search-section__input--vacancy');
const $phone = document.querySelector('.search-section__input--phone');
const $error = document.querySelector('.error');
const $editModal = document.getElementById('edit-modal');
const $editForm = document.getElementById('edit-form');
const $nameInput = document.getElementById('edit-name');
const $vacancyInput = document.getElementById('edit-vacancy');
const $phoneInput = document.getElementById('edit-phone');
const $editCancel = document.getElementById('edit-cancel');
const $searchModal = document.getElementById('search-modal');
const $searchInput = document.getElementById('search-input');


/**
 * Contact DOM API
 */

export const contactsDomApi = {
    getLetterGroups: function() {
        return document.querySelectorAll('.letter-group');
    },
    getCountsGroups: function() {
        return document.querySelectorAll('.letter-group__count');
    },

    add: function() {
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

    remove: function(id) {
        contactsStorageApi.remove(id);
        this.render();
    },

    render: function() {
        const groups = this.getLetterGroups();

        groups.forEach(group => {
            const contactsContainer = 
                group.querySelector('.letter-group__contacts');
            contactsContainer.innerHTML = ''; 
        });
        this.resetAllCounters(groups);

        const contacts = contactsStorageApi.getAll();

        contacts.forEach(contact => {
            const letterLower = getFirstLetter(contact).toLowerCase();
            const $group = 
                document.querySelector(
                    `.letter-group[data-id="${letterLower}"]`
                );

            const contactClone = 
                document.querySelector('#contact-template')
                .content.cloneNode(true);

            const $contactCard = contactClone.querySelector('.contact-card');
            $contactCard.setAttribute('data-id', contact.id);

            contactClone.querySelector('.contact-card__name').textContent = 
                `Name: ${contact.name}`;
            contactClone.querySelector('.contact-card__vacancy').textContent = 
                `Vacancy: ${contact.vacancy}`;
            contactClone.querySelector('.contact-card__phone').textContent = 
                `Phone ${contact.phone}`;

            const $removeButton = 
                $contactCard.querySelector('.contact-card__delete');
            $removeButton.addEventListener('click', () => {
                this.remove(contact.id);
            })

            const $editButton = 
                $contactCard.querySelector('.contact-card__edit');
            $editButton.addEventListener('click', () => {
                this.openEditModal(contact);
            });

            $group
                .querySelector('.letter-group__contacts')
                .appendChild(contactClone);

            this.updateCounter(getFirstLetter(contact), 1);
        })

    },

    init: function() {
        let letterGroups = this.getLetterGroups();

        letterGroups.forEach($group => {
            const $header = $group.querySelector('.letter-group__header');
            $header.addEventListener('click', () => {
                const contactsContainer = 
                    $group.querySelector('.letter-group__contacts');
                contactsContainer.classList.toggle('open');
            })
        });


    },

    updateCounter: function(letter, delta) {
        const letterLower = letter.toLowerCase();

        const $group = 
            document.querySelector(`.letter-group[data-id="${letterLower}"]`);
        const $count = $group.querySelector('.letter-group__count');

        let currentCount = Number.parseInt($count.textContent);
        currentCount += delta;

        if (currentCount < 0) currentCount = 0;

        $count.textContent = currentCount;

        if (currentCount === 0) {
            $count.classList.add('hidden');
        } else {
            $count.classList.remove('hidden');
        }
    },

    updateAllCounters: function() {
        let groups = this.getCountsGroups();
        groups.forEach(($group) => {
            if ($group.textContent == 0) {
                $group.classList.add('hidden');
            } else {
                $group.classList.remove('hidden');
            }
        })
    },

    resetAllCounters: function() {
        let groups = this.getCountsGroups();
        groups.forEach($count => {
            $count.textContent = '0';
            $count.classList.add('hidden');
        });
    },

    openEditModal: function(contact, currentSearchQuery = '') {
        $nameInput.value = contact.name;
        $vacancyInput.value = contact.vacancy;
        $phoneInput.value = contact.phone;

        $editModal.classList.add('show');

        const onSubmit = (event) => {
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
                const filtered = 
                    updatedContacts.filter(
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

    renderSearchResults: function(results) {
        const $searchResults = document.getElementById('search-results');
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

            $deleteButton.addEventListener('click', () => {
                this.remove(contact.id);
                $foundContact.remove();
            });

            $editButton.addEventListener('click', () => {
                const currentQuery = $searchInput.value.trim();
                this.openEditModal(contact, currentQuery);            
            });

            $searchResults.appendChild($foundContact);
        });
    }

}    
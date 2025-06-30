/**
 * Nodes
 */

const $contactList = document.querySelector('.list-section__container');
const $letterGroupTemplate = document.querySelector('#letter-group-template');


/**
 * Functions
 */

const renderLetterGroups = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    alphabet.forEach(letter => {
        const clone = $letterGroupTemplate.content.cloneNode(true);
        const $groupEl = clone.querySelector('.letter-group');
        $groupEl.dataset.id = letter.toLowerCase();
        $groupEl.querySelector('.letter-group__title').textContent = letter;
        $contactList.appendChild(clone);
    })
}

/**
 * Exports
 */

export { renderLetterGroups };
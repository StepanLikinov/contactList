/**
 * Nodes
 */

const $contactList: HTMLElement | null = 
    document.querySelector('.list-section__container');
const $letterGroupTemplate: HTMLTemplateElement | null = 
    document.querySelector('#letter-group-template');

/**
 * Functions
 */

const renderLetterGroups = () => {
    if (!$contactList || !$letterGroupTemplate) {
        console.error('Required DOM elements not found');
        return;
    }

    const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    alphabet.forEach(letter => {
        const clone = 
            $letterGroupTemplate.content.cloneNode(true) as DocumentFragment;

        const $groupEl = clone.querySelector<HTMLElement>('.letter-group');
        if ($groupEl) {
            $groupEl.dataset.id = letter.toLowerCase();

            const $title = $groupEl.querySelector<HTMLElement>('.letter-group__title');
            if ($title) {
                $title.textContent = letter;
            }

            $contactList.appendChild(clone);
        }
    });
}

/**
 * Exports
 */

export { renderLetterGroups };
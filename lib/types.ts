interface Contact {
    id: string;
    name: string;
    vacancy: string;
    phone: string;
}

interface ContactsStorageApi {
    getAll(): Contact[];
    saveAll(contacts: Contact[]): void;
    add(contact: Contact): void;
    create(name: string, vacancy: string, phone: string): Contact;
    remove(id: string): void;
    clearAll(): void;
}

interface ContactsDomApi {
    getLetterGroups(): NodeListOf<Element>;
    getCountsGroups(): NodeListOf<Element>;
    add(): void;
    remove(id: string): void;
    render(): void;
    init(): void;
    updateCounter(letter: string, delta: number): void;
    updateAllCounters(): void;
    resetAllCounters(): void;
    openEditModal(contact: Contact, currentSearchQuery?: string): void;
    renderSearchResults(results: Contact[]): void;
}

export { Contact, ContactsStorageApi, ContactsDomApi };
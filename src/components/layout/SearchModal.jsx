import { useContacts } from '../../context/ContactsContext';
import { useState } from 'react';

export default function SearchModal() {
    const {
        contacts,
        isSearchModalOpen,
        closeSearchModal,
        removeContact,
        openEditModal,
    } = useContacts();

    const [query, setQuery] = useState('');

    const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().startsWith(query.toLowerCase().trim()),
    );

    if (!isSearchModalOpen) return null;

    return (
        <div
            className={`modal ${isSearchModalOpen ? 'show' : ''}`}
            id="search-modal"
        >
            <div className="modal-content">
                <h2 className="modal-title">Search Contacts</h2>
                <input
                    type="text"
                    id="search-input"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <ul id="search-results" className="search-results">
                    {query.trim() === '' || filtered.length === 0 ? (
                        <li>No contacts found</li>
                    ) : (
                        filtered.map((contact) => (
                            <li key={contact.id} className="search-item">
                                <div className="contact-info">
                                    <div>
                                        <strong>Name:</strong> {contact.name}
                                    </div>
                                    <div>
                                        <strong>Vacancy:</strong>{' '}
                                        {contact.vacancy}
                                    </div>
                                    <div>
                                        <strong>Phone:</strong> {contact.phone}
                                    </div>
                                </div>
                                <div className="contact-actions">
                                    <button
                                        className="contact-card__edit"
                                        onClick={() => openEditModal(contact)}
                                    >
                                        ✎
                                    </button>
                                    <button
                                        className="contact-card__delete"
                                        onClick={() =>
                                            removeContact(contact.id)
                                        }
                                    >
                                        ✖
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
                <div className="modal-buttons">
                    <button
                        className="modal-buttons button"
                        onClick={closeSearchModal}
                        id="search-close"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

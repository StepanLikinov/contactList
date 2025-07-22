/**
 * Inports
 */

import { useContacts } from '../context/ContactsContext';
import { ContactCardProps } from '../types/interfaces';

/**
 * Contact Card
 */

export default function ContactCard({ contact }: ContactCardProps) {
    const { removeContact, openEditModal } = useContacts();

    return (
        <div className="contact-card">
            <div className="contact-card__info">
                <p className="contact-card__line contact-card__name">
                    {`Name: ${contact.name}`}
                </p>
                <p className="contact-card__line contact-card__vacancy">
                    {`Vacancy: ${contact.vacancy}`}
                </p>
                <p className="contact-card__line contact-card__phone">
                    {`Phone: ${contact.phone}`}
                </p>
            </div>
            <div className="contact-card__buttons">
                <button
                    className="contact-card__edit"
                    aria-label="Edit contact"
                    onClick={() => openEditModal(contact)}
                >
                    ✎
                </button>
                <button
                    className="contact-card__delete"
                    onClick={() => removeContact(contact.id)}
                    aria-label="Delete contact"
                >
                    ✖
                </button>
            </div>
        </div>
    );
}

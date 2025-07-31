/**
 * Inports
 */

import { ContactCardProps } from '../types/interfaces';
import { useAppDispatch } from '../hooks';
import { removeContact } from '../store/slices/contactsSlice';
import { openEditModal } from '../store/slices/uiSlice';

/**
 * Contact Card
 */

export default function ContactCard({ contact }: ContactCardProps) {
    const dispatch = useAppDispatch();
    const handleEdit = () => dispatch(openEditModal(contact));
    const handleDelete = () => dispatch(removeContact(contact.id));

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
                    onClick={handleEdit}
                >
                    ✎
                </button>
                <button
                    className="contact-card__delete"
                    onClick={handleDelete}
                    aria-label="Delete contact"
                >
                    ✖
                </button>
            </div>
        </div>
    );
}

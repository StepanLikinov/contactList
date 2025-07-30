import { openEditModal } from '../store/slices/uiSlice';
import { removeContact } from '../store/slices/contactsSlice';
import { useDispatch } from 'react-redux';

export default function ContactCard({ contact }) {
    const dispatch = useDispatch();
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
                    onClick={() => dispatch(openEditModal(contact))}
                >
                    ✎
                </button>
                <button
                    className="contact-card__delete"
                    onClick={() => dispatch(removeContact(contact.id))}
                    aria-label="Delete contact"
                >
                    ✖
                </button>
            </div>
        </div>
    );
}

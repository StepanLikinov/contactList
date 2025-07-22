import { useState, useEffect } from 'react';
import { useContacts } from '../../context/ContactsContext';
import { validatePhoneInput, validateTextInput } from '../../lib/helpers';

export default function EditModal() {
    const { isEditModalOpen, editableContact, updateContact, closeEditModal } =
        useContacts();

    const [formData, setFormData] = useState({
        name: '',
        vacancy: '',
        phone: '',
    });
    const [placeholders, setPlaceholders] = useState({
        name: 'Name',
        vacancy: 'Vacancy',
        phone: 'Phone +X XXX XXX XX XX',
    });

    useEffect(() => {
        if (editableContact) {
            setFormData({
                id: editableContact.id,
                name: editableContact.name || '',
                vacancy: editableContact.vacancy || '',
                phone: editableContact.phone || '',
            });
        }
    }, [editableContact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameValidation = validateTextInput(formData.name);
        const vacancyValidation = validateTextInput(formData.vacancy);
        const phoneValidation = validatePhoneInput(formData.phone);

        let newFormData = { ...formData };
        let newPlaceholders = {
            name: 'Name',
            vacancy: 'Vacancy',
            phone: 'Phone +X XXX XXX XX XX',
        };
        let isValid = true;

        if (!nameValidation.valid) {
            isValid = false;
            newFormData.name = '';
            newPlaceholders.name = nameValidation.message;
        }

        if (!vacancyValidation.valid) {
            isValid = false;
            newFormData.vacancy = '';
            newPlaceholders.vacancy = vacancyValidation.message;
        }

        if (!phoneValidation.valid) {
            isValid = false;
            newFormData.phone = '';
            newPlaceholders.phone = phoneValidation.message;
        }

        setFormData(newFormData);
        setPlaceholders(newPlaceholders);

        if (!isValid) return;

        updateContact(newFormData);
        closeEditModal();
    };

    return (
        <div
            id="edit-modal"
            className={`modal ${isEditModalOpen ? 'show' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="modal-content">
                <h2 className="modal-title">Редактировать контакт</h2>
                <form id="edit-form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            id="edit-name"
                            placeholder={placeholders.name}
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            required
                        />
                    </label>
                    <label>
                        Vacancy:
                        <input
                            type="text"
                            id="edit-vacancy"
                            placeholder={placeholders.vacancy}
                            value={formData.vacancy}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    vacancy: e.target.value,
                                })
                            }
                            required
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            id="edit-phone"
                            placeholder={placeholders.phone}
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                })
                            }
                            required
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="submit">Сохранить</button>
                        <button
                            type="button"
                            id="edit-cancel"
                            onClick={closeEditModal}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

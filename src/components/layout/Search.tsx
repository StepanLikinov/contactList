import { useEffect, useState, ChangeEvent } from 'react';
import { useContacts } from '../../context/ContactsContext';
import {
    createContact,
    validateTextInput,
    validatePhoneInput,
} from '../../lib/helpers';

import SearchButton from '../SearchButton';
import SearchInput from '../SearchInput';
import Error from '../Error';
import { FormData, Errors } from '../../types/interfaces';

export default function Search() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        vacancy: '',
        phone: '',
    });

    const [errors, setErrors] = useState<Errors>({
        name: '',
        vacancy: '',
        phone: '',
    });

    const [showError, setShowError] = useState(false);

    const { addContact, clearContacts, openSearchModal } = useContacts();

    useEffect(() => {
        const hasError = Object.values(errors).some(
            (errorMsg) => errorMsg !== '',
        );

        if (hasError) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                setErrors({ name: '', vacancy: '', phone: '' });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    const handleChange =
        (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const resetForm = () => {
        setFormData({ name: '', vacancy: '', phone: '' });
        setErrors({ name: '', vacancy: '', phone: '' });
    };

    const handleAdd = () => {
        const nameValidation = validateTextInput(formData.name);
        const vacancyValidation = validateTextInput(formData.vacancy);
        const phoneValidation = validatePhoneInput(formData.phone);

        setErrors({
            name: nameValidation.valid ? '' : nameValidation.message || '',
            vacancy: vacancyValidation.valid
                ? ''
                : vacancyValidation.message || '',
            phone: phoneValidation.valid ? '' : phoneValidation.message || '',
        });

        if (!nameValidation.valid)
            setFormData((prev) => ({ ...prev, name: '' }));
        if (!vacancyValidation.valid)
            setFormData((prev) => ({ ...prev, vacancy: '' }));
        if (!phoneValidation.valid)
            setFormData((prev) => ({ ...prev, phone: '' }));

        if (
            nameValidation.valid &&
            vacancyValidation.valid &&
            phoneValidation.valid
        ) {
            const newContact = createContact(
                formData.name,
                formData.vacancy,
                formData.phone,
            );

            addContact(newContact);
            resetForm();
        }
    };

    const handleClear = () => {
        clearContacts();
        resetForm();
    };

    return (
        <section className="search-section">
            <div className="search-section__container container">
                <div className="search-section__inputs">
                    <SearchInput
                        classExtraName="name"
                        placeholder={errors.name || 'Name'}
                        value={formData.name}
                        onChange={handleChange('name')}
                        isInvalid={!!errors.name}
                    />
                    <SearchInput
                        classExtraName="vacancy"
                        placeholder={errors.vacancy || 'Vacancy'}
                        value={formData.vacancy}
                        onChange={handleChange('vacancy')}
                        isInvalid={!!errors.vacancy}
                    />
                    <SearchInput
                        classExtraName="phone"
                        placeholder={errors.phone || 'Phone +X XXX XXX XX XX'}
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        isInvalid={!!errors.phone}
                    />
                    <SearchButton
                        classExtraName="add"
                        label="ADD"
                        onClick={handleAdd}
                    />
                    <SearchButton
                        classExtraName="clear"
                        label="Clear List"
                        onClick={handleClear}
                    />
                    <SearchButton
                        classExtraName="search"
                        label="Search"
                        onClick={openSearchModal}
                    />
                </div>
                <Error visible={showError} />
            </div>
        </section>
    );
}

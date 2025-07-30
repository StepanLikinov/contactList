import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, clearContacts } from '../../store/slices/contactsSlice';
import { openSearchModal } from '../../store/slices/uiSlice';

import {
    createContact,
    validateTextInput,
    validatePhoneInput,
} from '../../lib/helpers';

import SearchButton from '../SearchButton';
import SearchInput from '../SearchInput';
import Error from '../Error';

export default function Search() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [vacancy, setVacancy] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        vacancy: '',
        phone: '',
    });
    const [showError, setShowError] = useState(false);

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

    const handleAdd = () => {
        const nameValidation = validateTextInput(name);
        const vacancyValidation = validateTextInput(vacancy);
        const phoneValidation = validatePhoneInput(phone);

        setErrors({
            name: nameValidation.valid ? '' : nameValidation.message,
            vacancy: vacancyValidation.valid ? '' : vacancyValidation.message,
            phone: phoneValidation.valid ? '' : phoneValidation.message,
        });

        if (!nameValidation.valid) setName('');
        if (!vacancyValidation.valid) setVacancy('');
        if (!phoneValidation.valid) setPhone('');

        if (
            nameValidation.valid &&
            vacancyValidation.valid &&
            phoneValidation.valid
        ) {
            const newContact = createContact(name, vacancy, phone);
            dispatch(addContact(newContact));

            setName('');
            setVacancy('');
            setPhone('');
            setErrors({ name: '', vacancy: '', phone: '' });
        }
    };
    const handleClear = () => {
        dispatch(clearContacts());
        setErrors({ name: '', vacancy: '', phone: '' });
    };

    return (
        <section className="search-section">
            <div className="search-section__container container">
                <div className="search-section__inputs">
                    <SearchInput
                        classExtraName="name"
                        placeholder={errors.name || 'Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    <SearchInput
                        classExtraName="vacancy"
                        placeholder={errors.vacancy || 'Vacancy'}
                        value={vacancy}
                        onChange={(e) => setVacancy(e.target.value)}
                        isInvalid={!!errors.vacancy}
                    />
                    <SearchInput
                        classExtraName="phone"
                        placeholder={errors.phone || 'Phone +X XXX XXX XX XX'}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                        onClick={() => dispatch(openSearchModal())}
                    />
                </div>
                <Error visible={showError} />
            </div>
        </section>
    );
}

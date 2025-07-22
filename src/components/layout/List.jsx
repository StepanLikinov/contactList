import LetterGroup from '../LetterGroup';
import ContactCard from '../ContactCard';
import { useContacts } from '../../context/ContactsContext';

export default function List({ chars, countMap }) {
    const { contacts } = useContacts();

    return (
        <section className="list-section">
            <div className="list-section__container container">
                {chars.split('').map((letter) => {
                    const groupContacts = contacts.filter((c) =>
                        c.name?.toUpperCase().startsWith(letter),
                    );

                    return (
                        <LetterGroup
                            key={letter}
                            letter={letter}
                            count={groupContacts.length}
                        >
                            {groupContacts.map((contact) => (
                                <ContactCard
                                    key={contact.id}
                                    contact={contact}
                                />
                            ))}
                        </LetterGroup>
                    );
                })}
            </div>
        </section>
    );
}

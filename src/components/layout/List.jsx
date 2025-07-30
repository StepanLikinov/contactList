import LetterGroup from '../LetterGroup';
import ContactCard from '../ContactCard';
import { useSelector } from 'react-redux';

export default function List({ chars }) {
    const contacts = useSelector((state) => state.contacts.contacts);

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

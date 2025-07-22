import { useState } from 'react';

export default function LetterGroup({ letter, count, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen((prev) => !prev);

    return (
        <div className="letter-group" data-id={letter.toLowerCase()}>
            <div className="letter-group__header" onClick={toggleOpen}>
                <h2 className="letter-group__title">{letter}</h2>
                <h2 className="letter-group__count">{count}</h2>
            </div>
            <div className={`letter-group__contacts ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    );
}

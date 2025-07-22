/**
 * Imports
 */

import { SearchInputProps } from '../types/interfaces';

/**
 * Search Input
 */

export default function SearchInput({
    classExtraName,
    placeholder,
    value,
    onChange,
    isInvalid,
}: SearchInputProps) {
    return (
        <input
            type="text"
            className={`search-section__input search-section__input--${classExtraName} ${
                isInvalid ? 'invalid' : ''
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        ></input>
    );
}

/**
 * Imports
 */

import { SearchButtonProps } from '../types/interfaces';

/**
 * Searc Button
 */

export default function SearchButton({
    classExtraName,
    label,
    onClick,
}: SearchButtonProps) {
    return (
        <button
            className={`search-section__button search-section__button--${classExtraName}`}
            type="button"
            onClick={onClick}
        >
            {label}
        </button>
    );
}

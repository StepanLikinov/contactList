export default function SearchButton({ classExtraName, label, onClick }) {
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

export default function SearchInput({
    classExtraName,
    placeholder,
    value,
    onChange,
    isInvalid,
}) {
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

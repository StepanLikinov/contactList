export default function LabeledInput({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
}) {
    return (
        <label>
            {label}:
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
        </label>
    );
}

import { LabeledInputProps } from '../types/interfaces';

export default function LabeledInput({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
}: LabeledInputProps) {
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

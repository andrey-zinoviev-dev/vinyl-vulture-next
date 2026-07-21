import styles from "./SearchInput.module.css";

interface SearchInputProps {
    // onSearch: (q: string) => void;
    onChange: (q: string) => void;
    onFocus: () => void;
    value: string;
}
export function SearchInput({ onChange, onFocus, value }: SearchInputProps) {
    return (
        <input
        className={styles.input}
        type="text"
        placeholder="Поиск"
        name="q"
        onChange={e => onChange(e.target.value)}
        value={value}
        onFocus={onFocus}
    />
)}
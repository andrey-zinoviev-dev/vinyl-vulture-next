interface SearchInputProps {
    // onSearch: (q: string) => void;
    onChange: (q: string) => void;
    onFocus: () => void;
    value: string;
}
export function SearchInput({ onChange, onFocus, value }: SearchInputProps) {
    return <form method="GET" onSubmit={e => {
        e.preventDefault();
        // onSearch(value);    //call the onSearch function with the value
    }}>
        <input type="text" placeholder="Search" name="q" onChange={e => onChange(e.target.value)} value={value} 
        onFocus={onFocus} />
        {/* <button type="submit">Search</button> */}
    </form>
}
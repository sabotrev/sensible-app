import { useContext, useState } from 'react';
import SearchContext from '../context/SearchContext';
import { useDebounce } from '../hooks/useDebounce';

const KeywordSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const context = useContext(SearchContext);
    const { location, isSearching, search, setIsWithAddresses } = context;

    const handleClick = useDebounce(() => search(inputValue));

    return (
        <div id="keyword_search_container">
            <label>
                <div id="search_text">Search</div>
                <input
                    id="keyword_input"
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
            </label>
            <button
                onClick={() => handleClick()}
                disabled={
                    !(inputValue.length > 0 && location !== undefined) ||
                    isSearching
                }
            >
                Search
            </button>
            <label>
                <input
                    type="checkbox"
                    onChange={() =>
                        setIsWithAddresses((prevValue) => !prevValue)
                    }
                />
                With precise address?
            </label>
        </div>
    );
};

export default KeywordSearch;

import '../styles/SearchBar.scss';

import searchIcon from '../assets/images/search.svg';

interface SearchBarProperties {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ value, setValue }: SearchBarProperties) => {
    return (
        <div className="search-bar">
            <div className="wrapper">
                <img src={searchIcon} alt="search icon" />
                <input type="text" placeholder="Search.." onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    );
};

export default SearchBar;

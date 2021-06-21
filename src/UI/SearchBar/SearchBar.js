import './SearchBar.css';

const SearchBar = () =>{
  return(
      <div className="search">
        <input  className="searchTerm" placeholder="What are you looking for?"/>
        <button className="searchButton">
        </button>
      </div>
  );
}

export default SearchBar;
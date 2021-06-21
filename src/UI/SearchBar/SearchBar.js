import './SearchBar.css';

const SearchBar = () =>{
  return(
      <div class="search">
        <input  class="searchTerm" placeholder="What are you looking for?"/>
        <button class="searchButton">
        </button>
      </div>
  );
}

export default SearchBar;
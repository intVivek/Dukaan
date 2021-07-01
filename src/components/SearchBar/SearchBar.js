import './SearchBar.css';
import {useState} from 'react';

const SearchBar = (props) =>{
  const [searchText,setSearchText]=useState("");
  return(
      <div className="search">
        <input  className="searchTerm" onChange={(event) => {setSearchText(event.target.value)}} placeholder="What are you looking for?"/>
        <button className="searchButton" onClick={()=>{props.setSearch(searchText);console.log(searchText)}}>
        </button>
      </div>
  );
}

export default SearchBar;
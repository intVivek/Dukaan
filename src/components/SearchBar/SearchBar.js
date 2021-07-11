import './SearchBar.css';
import {useState} from 'react';
import { useHistory } from "react-router-dom";

const SearchBar = (props) =>{
  const [searchText,setSearchText]=useState("");
  let history = useHistory();
  return(
      <div className="search">
        <input  className="searchTerm" onChange={(event) => {setSearchText(event.target.value)}} placeholder="What are you looking for?"/>
        <button className="searchButton" onClick={()=>{history.push('/search?q='+searchText+'&page=1&sort=popularity');props.setReload(!props.reload);}}>
        </button>
      </div>
  );
}

export default SearchBar;
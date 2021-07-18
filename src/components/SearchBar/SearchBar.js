import './SearchBar.css';
import {useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";

const SearchBar = (props) =>{
  const [searchText,setSearchText]=useState("");
  let history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    history.push('/search?q='+searchText+'&page=1&sort=popularity');
    props.setReload(!props.reload);
  };
  useEffect(()=>{
    setSearchText('');
  },[props.reload]);
  return(
        <form className="search">
        <input className="searchTerm" value={searchText} onChange={(event) => {setSearchText(event.target.value)}} placeholder="What are you looking for?"/>
        <button  type="submit" className="searchButton" onClick={handleSubmit}>
        </button>
        </form>
  );
}

export default SearchBar;
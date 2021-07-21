import './SearchBar.css';
import {useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";

const SearchBar = (props) =>{
  const [searchText,setSearchText]=useState('');
  let history = useHistory();
  const handleSubmit = e => {
    if(searchText.length>0){
        props.setBodyLoading(true);
        e.preventDefault();
        history.push('/search?q='+searchText+'&page=1&sort=popularity');
        setSearchText('');
        props.setReload(!props.reload);
    }
  };
  useEffect(()=>{
    setSearchText('');
  },[props.reload]);
  return(
        <div className="search">
        <input className="searchTerm" onKeyDown={(e) =>{e.keyCode === 13 && searchText && handleSubmit(e)}} value={searchText} onChange={(event) => {setSearchText(event.target.value)}} placeholder="What are you looking for?"/>
        <button  className="searchButton" onClick={searchText && handleSubmit}>
        </button>
        </div>
  );
}

export default SearchBar;
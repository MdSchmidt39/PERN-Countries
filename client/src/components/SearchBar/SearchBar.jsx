import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountryByName } from "../../actions";
import "./SearchBar.css"

export default function SearchBar({setFilterSelection}) {
    const defaultSelection = {
            name: "",
            population: "",
            continent: "",
            season: "All",
            activity: "All"
        }
    const dispatch = useDispatch();
    const [ country, setCountry ] = useState("");
    
    function handleInputChange(e){
        e.preventDefault()
        setCountry(e.target.value)
    }

    function onSubmit(e){
        e.preventDefault();
        dispatch(searchCountryByName(country))
         setFilterSelection(defaultSelection)
    }

    return (
        <div className="searchbar">
            <input className="search-input" placeholder="Buscar" name="search" type="text" onChange={e => handleInputChange(e)}></input>
            <button className="search-button" type="submit" onClick={(e) => onSubmit(e)}>Buscalo</button>
        </div>
        )
}
    
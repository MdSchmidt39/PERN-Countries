import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries } from "../../actions/index";
import Paginated from "../Paginated/Paginated";
import Nav from "../Nav/Nav";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar"
import Cards from "../Card/Cards";
import "./Home.css"


export default function Home(){

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(10)
    const [ filterSelection, setFilterSelection ] = useState({
        continent: "All",
        season: "All",
        activity: "All"
    })

    const countriesFirstPage = 9;
    const differenceOfCountries = countriesPerPage - countriesFirstPage
    const indexOfLastCountry = currentPage===1? countriesFirstPage: countriesPerPage*currentPage-differenceOfCountries;
    const indexOfFirstCountry = indexOfLastCountry - (currentPage===1?countriesFirstPage:countriesPerPage);
    const currentCountries = allCountries?.slice(indexOfFirstCountry, indexOfLastCountry);
    
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() =>{
        dispatch(getCountries())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }



    return(
        <div className="homeBody">
            <Nav/>
            <div className="search">
                <SearchBar setFilterSelection={setFilterSelection}/>  
                <button onClick={e => {handleClick(e)}}>
                    Actualizar países
                </button>    
            </div>
            <div className="filters">
                <Filter filterSelection={filterSelection } setFilterSelection={setFilterSelection}/>
            </div>
            {
            currentCountries?
            <Cards countries={currentCountries}/>:
            <span className="errorMsg">No hay un país que coincida con la busqueda</span>
            }
            <div className="paginated-div">
                <Paginated
                    countriesPerPage={ countriesPerPage }
                    allCountries={ allCountries?.length }
                    paginated={paginated} 
                    currentPage={currentPage}        
                    />
            </div>
        </div>
    )
}
/* eslint-disable */
import React from "react";
import "./Paginated.css"

export default function Paginated ({setCurrentPage, countriesPerPage, allCountries, paginated, currentPage}){
    const pageNumbers = []

    for(let i=1; i <= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)
    } 

    return(
    <div className="paginadoContainer">
        <nav className="paginado">
            <ul>
                {/* <li key={number} onClick={setCurrentPage===number-1}>Previous</li> */}
                {
                    pageNumbers && pageNumbers.map(number => (
                        number!==0?
                        <li key={number} className={currentPage===number?`paginado active`:`paginado`} >
                            <a className="page" onClick={() => paginated(number)}> {number} </a>
                        </li>:null
                    ))
                }
            </ul>
        </nav>
    </div>
    )
}
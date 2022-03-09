/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect } from "react";
import Nav from "../Nav/Nav";
import { useSelector, useDispatch } from "react-redux";
import { getCountriesByID, removeCountryDetails } from "../../actions";
import "./CardDetails.css"

export default function CardDetail(props){
    const dispatch = useDispatch();
    const country = useSelector(state => state.countryDetails);
    const activities = useSelector(state => state.countryDetails.activities)

    useEffect(() => {
        dispatch(getCountriesByID(props.match.params.id));
        return () => { 
                dispatch(removeCountryDetails())
        }
    }, [dispatch])

    return(
        <div>
            <Nav/>
            {country?
            <div className="cardDetailDiv">
            <h2 className="card-title">{country.name}</h2>
                <div className="flagDiv">
                    <img className="country-flag" src={country.flag} alt="Img not found"/>
                </div>
                <div>
                    <h2>Detalles del país</h2>
                    <h3>Codigo:<span>{country.id}</span></h3>
                    <h3>Capital: <span>{country.capital}</span></h3>
                    <h3>Población: <span>{Number(country.population).toLocaleString()} habitantes</span></h3>
                    <h3>Continente: <span>{country.continent}</span></h3>
                    <h3>Sub-continente: <span>{country.subregion}</span></h3>
                    <h3>Territorio: <span>{Number(country.area).toLocaleString()} km<sup>2</sup></span></h3>
                </div>
                <div className="activities">
                    <h2>Actividades turisticas</h2>
                    <div>
                        {activities!== undefined && activities?.map(a => (
                            <div key={a.id}>
                                <h2>Nombre:{a.name} </h2>
                                <h3> Dificultad:{a.difficulty} </h3>
                                <h3> Duración:{a.duration} hours </h3>
                                <h3> Época del año: {a.season}</h3>
                            </div>
                            
                        ))}
                    </div>
                </div>
        </div>:
            null}
        </div>
            )
}
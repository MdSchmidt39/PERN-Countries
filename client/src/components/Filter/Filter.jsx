import React, {useEffect} from "react";
import {useDispatch, useSelector } from "react-redux";
import { getCountriesByContinent, 
         filterBySeason, 
         getCountriesByAlphabeticalOrder,
         getCountriesByPopulation ,
         filterByActivity,
         getAllActivities
        } from "../../actions";

export default function Filter({filterSelection, setFilterSelection}){
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities)


    useEffect(() => {
        dispatch(getAllActivities())
    }, [dispatch])
    
    
    function handleFilterContinent(e){
        dispatch(getCountriesByContinent(e.target.value))
        setFilterSelection({
            continent: e.target.value
        })
    };

    const handleFilterSeason = (e) =>{
        e.preventDefault();
        dispatch(filterBySeason(e.target.value))
        setFilterSelection({
            season: e.target.value
        })
    }

    function handleOrderCountry(e){
        e.preventDefault();
        dispatch(getCountriesByAlphabeticalOrder(e.target.value));
        setFilterSelection({
            country: e.target.value
        })
    }

    const handleOrderPopulation = (e) => {
        e.preventDefault();
        dispatch(getCountriesByPopulation(e.target.value));
        setFilterSelection({
            population: e.target.value
        })
    }

    function handleFilterActivity (e){
        e.preventDefault();
        dispatch(filterByActivity(e.target.value))
        setFilterSelection({
            activity: e.target.value
        })
    };

    

    return (
        <div>           
            <label>Ordenar alfabeticamente</label>
                <select onChange={e => handleOrderCountry(e)}>
                    <option value= "asc">A-Z</option>
                    <option value= "desc">Z-A</option>
                </select>
            <label>Ordenar por población</label>
                <select onChange={e => handleOrderPopulation(e)}>
                    <option value= "asc">Mayor población</option>
                    <option value="desc">Menor población</option>
                </select>
            <label>Filtrar por continente</label>
                <select  onChange={e => handleFilterContinent(e)}>
                    <option value="All">Todos los continetes</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value='Africa'>Africa</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='Antarctic'>Antarctica</option>
                </select>
            <label>Filtrar por temporadas</label>
                <select onChange={e => handleFilterSeason(e)}>
                    <option value="All">Por defecto...</option>
                    <option value="Winter">Invierno</option>
                    <option value="Autumn">Otoño</option>
                    <option value="Summer">Verano</option>
                    <option value="Spring">Primavera</option>
                </select>
            <label>Ver Actividades</label>
                <select onChange={e => handleFilterActivity(e)}>
                    <option value="All">Por defecto...</option>
                    {activities && activities?.map((a) => (
                        <option value={a.name} key={a.id}>{a.name}</option>
                    ))}
                </select>
        </div>
    )
}
import axios from "axios";

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/countries/all",{           
        });
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        })
    }
}

export function searchCountryByName(payload){
    return async function(dispatch){
            var searchResults = await axios.get("http://localhost:3001/countries/search?name=" + payload).catch(e => {
                if(e.response.status === 404){
                    return dispatch({
                        type: "SEARCH_COUNTRY_BY_NAME",
                        payload: []
                    })
                }
            })
            return dispatch({           
                type: "SEARCH_COUNTRY_BY_NAME",
                payload: searchResults.data
            })
    }
}

export function getCountriesByID(id){
    return async function(dispatch){
        let results = await axios.get("http://localhost:3001/countries/" + id)
        dispatch({
            type: "GET_COUNTRY_BY_ID",
            payload: results.data
        })
    }

}

export function postActivities(data){
        return async function(dispatch){
            let postResult = await axios.post("http://localhost:3001/activities/add", data)
            dispatch({
                type: "POST_ACTIVITY",
                payload: postResult.data
            })
        }
}

export function getCountriesByContinent(payload){
    return {
        type: "GET_COUNTRIES_BY_CONTINENT",
        payload
    }
}

export function getCountriesByAlphabeticalOrder(payload){
    return {
        type: "GET_COUNTRIES_BY_ALPHABETICAL_ORDER",
        payload
    }
}

export function getCountriesByName(payload){
    return {
        type: "GET_COUNTRIES_BY_NAME",
        payload
    }
}
export function getCountriesByPopulation(payload){
    return {
        type: "GET_COUNTRIES_BY_POPULATION",
        payload
    }
}

export function filterBySeason(payload){
    return{
        type: "FILTER_BY_SEASON",
        payload
    }
}

export function getAllActivities(){
    return async (dispatch) => {
        let results = await axios.get('http://localhost:3001/activities/all');
        dispatch({
            type: "GET_ALL_ACTIVITIES",
            payload: results.data
        })
    }
}

export function filterByActivity(payload){
    return {
        type: "FILTER_BY_ACTIVITY",
        payload
    }
}

export function removeCountryDetails(){
    return async (dispatch) => {
        dispatch({
            type: "REMOVE_COUNTRY_DETAILS",
        })
    }
}
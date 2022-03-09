const initialState = {
    countries : [],
    tempCountries: [],
    countryDetails: [],
    activities: [],
    activityCountries: []
}


function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                tempCountries: action.payload
                
            }

        case "GET_COUNTRIES_BY_CONTINENT":
                const allCountries = state.tempCountries
                const continentFiltered = action.payload === "All" ? allCountries : allCountries.filter(ac => ac.continent === action.payload)
                return {
                    ...state,
                    countries: continentFiltered 
                }

        case "GET_COUNTRIES_BY_ALPHABETICAL_ORDER":
                let alphabeticalOrder = action.payload === "asc" ? state.countries.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;                        
                    } 
                    if(b.name > a.name ) {
                        return -1;
                    }
                    return 0;
                }): 
                state.countries.sort(function(a, b){
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    countries: alphabeticalOrder
                }

        case "GET_COUNTRIES_BY_POPULATION":
                let countriesOrderPop = action.payload === "asc" ? state.countries.sort(function(a, b){
                    if(a.population < b.population) return 1; 
                    if(a.population > b.population) return -1; 
                        return 0
                }):state.countries.sort((a, b) => {
                    if(a.population > b.population) return 1; 
                    if(a.population < b.population) return -1; 
                        return 0
                })
                return {
                    ...state,
                    countries: countriesOrderPop
                    }
        case "SEARCH_COUNTRY_BY_NAME":
            return {
                ...state,
                countries: action.payload
            }
        case "GET_COUNTRY_BY_ID":
            return {
                ...state,
                countryDetails: action.payload
            }

        case "POST_ACTIVITY":
            return{
                ...state,
                activityCountries: action.payload
            }
        case "GET_ALL_ACTIVITIES":
            return{
                ...state,
                activities: action.payload,
                activityCountries: action.payload
            }
        case "FILTER_BY_SEASON":
            const allSeasons = action.payload === "All" ? state.tempCountries : state.tempCountries.filter(a => {
                var act = a.activities?.find(b => b.season === action.payload)
                return act !== undefined;
            })
            return{
                ...state,
                countries: allSeasons
            }
        case "FILTER_BY_ACTIVITY":
            const allActivities = action.payload === "All" ? state.tempCountries : state.tempCountries.filter(a => {
                var act = a.activities?.find(b => b.name === action.payload)
                return act !== undefined
            })
            return{
                ...state,
                countries: allActivities
            }
        case "REMOVE_COUNTRY_DETAILS":

            return{
                ...state,
                countryDetails: []
            }
            
            default:
                return state;
    }   
}

export default rootReducer
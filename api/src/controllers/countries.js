const { Country, Activity } = require("../db");
const axios = require("axios");

async function getApiCountries(req, res, next){
        const apiUrl = await axios.get("https://restcountries.com/v3/all");
        try {
            const countriesInfo = await apiUrl.data.map(c => {
                Country.findOrCreate({
                    where:{
                        name: c.name.official,
                        id: c.cca3,
                        flag: c.flags[0],
                        continent: c.region,
                        capital: c.capital?c.capital[0]:"",
                        subregion: c.subregion?c.subregion:"",
                        area: c.area,
                        population: c.population
                    }
                })
            });
        } catch (error) {
            next(error)
        }
}
getApiCountries()


const getAllCountries = async (req, res, next) => {
    try {
        const allCountries = await Country.findAll({
            include: Activity
        })
        res.status(200).send(allCountries)
    } catch (error) {
        next(error)
    }
}

// function getPromiseCountry(req, res, next){
//      Country.findAll({
//         include: Activity
//     }).then((countriesPromise) => {res.status(200).})
//         .catch(next(error))
// }

const getCountryByName = async (req, res, next) => {
    const name = req.query.name
    try {
        const allCountries = await Country.findAll({
            include: Activity
        })
        if(name){
            let countryName = await allCountries.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            countryName.length ?
            res.status(200).send(countryName):
            res.status(404).send("Lo sentimos, no se encontro ningún país con ese nombre")
        } else {
            res.status(200).send(allCountries)
        }
    } catch (error) {
        next(error)
    }
}

const getCountryById = async (req, res, next) => {
    const { id } = req.params
    try {
        const country = await Country.findByPk(id.toUpperCase(), {
            include : Activity
        })
            if(country){
                res.status(200).send(country)
            }else{
                res.status(404).send("el ID ingresado no coincide con ningún país existente")
        }
        } catch (error) {
            next(error)
        }
}
    



module.exports = {
    getAllCountries,
    getCountryByName,
    getCountryById
}
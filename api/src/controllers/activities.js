const { Activity, Country } = require("../db");

async function addActivities(req, res){
    const { name, difficulty, duration, season, countries } = req.body;
    try {
        const activityModel = await Activity.findOrCreate({
            where: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season,
            },
        });
        const activity = await Activity.findOne({
            where:{
                name: name
            }
        });
        countries.forEach(c => {
            activity.addCountry(c)
        });
        res.status(200).send("Actividad agregada con éxito");
        
    } catch (error) {
        console.log(error)
    }
}

async function getAllActivities(req, res){
    try {
        const all = await Activity.findAll({
            include:{
                model: Country,
                attributtes: ["id", "name", "continent", "subregion"]
            }
        });
        res.status(200).send(all)
    } catch (error) {
        console.log(error)
    }
}

async function getActivitiesByCountry(req, res){
    try {
        const  { countryId }  = req.params
        const country = await Country.findByPk(countryId.toUpperCase(), {
            include: [{
                model: Activity,
                attributtes: ["id", "name", "difficulty", "duration","season"]
            }]
        });
        if(country){
            res.status(200).send(country);
        } else {
            res.status(404).send("La ID indicada no coincide con ningún país")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addActivities,
    getAllActivities,
    getActivitiesByCountry
}
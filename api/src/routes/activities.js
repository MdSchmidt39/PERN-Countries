const express = require("express");
const router = express.Router();
const { addActivities, 
        getAllActivities,
        getActivitiesByCountry
        } = require("../controllers/activities")

router.post("/add", addActivities);

router.get("/all", getAllActivities);

router.get("/:countryId", getActivitiesByCountry);

module.exports =  router;
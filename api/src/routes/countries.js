const express = require("express");
const router = express.Router();
const { getAllCountries, 
        getCountryByName,
        getCountryById,
        } = require("../controllers/countries")


router.get("/all", getAllCountries);

router.get("/search", getCountryByName);

router.get("/:id", getCountryById);

module.exports = router;
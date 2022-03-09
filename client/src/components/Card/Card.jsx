import React from "react";
import "./Card.css"


export default function Card({flag, name, continent}){
    return (
        <div className="countryCard">
            <img className="flagImg" src={flag} alt="img loading" width="200px" height="150px"/>
            <h2>{name}</h2>
            <h4>{continent}</h4>
        </div>
    );
}
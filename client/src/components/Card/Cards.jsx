import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom"
import "./Card.css"


export default function Cards({countries}){
    return (
        <div className="countriesCards" >
            {
                countries && countries?.map(c => (
                    <div key={c.id}>
                    <Link to={"/countries/" + c.id}>
                        <Card 
                            key={c.id}
                            name={c.name}
                            flag={c.flag}
                            continent={c.continent}
                            />
                    </Link>
                </div>
            ))
        }
        </div>
        )
}
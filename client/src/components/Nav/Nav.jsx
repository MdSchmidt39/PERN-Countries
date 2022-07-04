import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css"

export default function Nav(){
    return(
        <React.Fragment>
            <nav className="nav">
            <Link to= "/home">
                <h1 className="homeTitle">Henry Countries App</h1>
            </Link>
                    <div className="button">
                        <Link to="/activities"><h2>Agrega una actividad</h2></Link>
                    </div>
            </nav>
        </React.Fragment>
    )
}
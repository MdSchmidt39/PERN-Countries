import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css"

export default function Nav(){
    return(
        <React.Fragment>
            <nav className="nav">
                <h1 className="homeTitle">Henry Countries App</h1>
                <div className="menu">
                    <div className="button">
                        <Link to= "/home"> Home </Link>
                    </div>
                    <div className="button">
                        <Link to="/activities"> Agrega una actividad </Link>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}
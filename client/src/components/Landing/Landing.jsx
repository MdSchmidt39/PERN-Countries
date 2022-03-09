import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"


export default function Landing(){
    return (
                <div className="landing">
                    <h1 className="landingTitle">Bievenidos a Henry Countries App</h1>         
                    <Link to="/home">
                        <button className="landingBtn" >Recorre el mundo</button >
                    </Link>
                </div>    
        )
}
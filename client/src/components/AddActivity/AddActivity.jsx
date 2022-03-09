import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../Nav/Nav";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, postActivities } from "../../actions";
import "./AddActivity.css"

export default function AddActivity(){
    const formState = {
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    }
    const [ form, setForm ] = useState(formState);
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const [ errors, setErrors ] = useState({});
    const history = useHistory();

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

     const handleSubmit = (e) => {
        e.preventDefault()
        if( !form.name || !form.difficulty || !form.duration || !form.season || 
            !form.season === '' ||!form.difficulty === '' || 
            errors.hasOwnProperty('name') || errors.hasOwnProperty('difficulty') || 
            errors.hasOwnProperty('duration') || errors.hasOwnProperty('season') || errors.hasOwnProperty('countries')){
                alert('Complete correctamente todos los campos');
            } else {
                dispatch(postActivities(form));
                alert('La actividad ha sido agregada con exito!')
            setForm({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                countries: []
            })
            history.push('/home');
        }
        
    };
    
    const check = (data) => {
        let errors = {};
        if(data.name === ''){
            errors.name = 'Por favor entre un nombre para la actividad';
        } else  if(!/^[a-zA-Z0-9\_\-\' ']{2,20}$/.test(data.name)) { // eslint-disable-line
            errors.name = 'El nombre debe tener entre 2 y 20 caracteres. No se aceptan simbolos!';
        }
        
        if(data.difficulty === ''){
            errors.difficulty = 'Por favor selecciona un nivel de dificultad!';
        }
        
        if(data.duration === ''){
            errors.duration = 'Debes aclarar la duración de la actividad!';
        } else if(!/^([0-1]?[0-9]|20)$/.test(data.duration) || /\D+/.test(data.duration)) {
            errors.duration = 'Solo numeros del 1 al 20!';
        } 
        
        if(data.season === ''){
            errors.season = 'Selecciona una estacion del año!';
        }
        
        if(data.countries.length === 0){
            errors.countries = 'Selecciona al menos un país!';
        }
        
        return errors;
    }
    
    const handleChange = (data) => {
        if(data.target.name==='countries'){
            let value = Array.from(data.target.selectedOptions, option => option.value);
            setForm({
                ...form,
                countries: value
            })
            setErrors(check({
                ...form,
                countries: value
            }))
        } else {
            setForm({
                ...form,
                [data.target.name]: data.target.value
            });
            setErrors(check({
                ...form,
                [data.target.name]: data.target.value
            }))
        }
    };
    
    return(
        <div>
            <Nav />
            <div className="activityMain">
                <h1>Agrega una actividad</h1>
                <form className="formulario" onSubmit={(form) => handleSubmit(form)}>
                    <div className="formDetails">
                        <div className="col">
                            <div>
                                <label>Nombre de la actividad:</label>
                                <input className="input" id="name" name="name" type='text' value={form.name} onChange={text => handleChange(text)} placeholder="Nombre de la actividad" required/>
                                {errors.name ? <span className="error">{errors.name}</span>: null}
                            </div>
                            <div>
                                <label>Dificultad:</label>
                                <select className="input" name="difficulty" defaultValue={form.difficulty} onChange={option => handleChange(option)} required>
                                    <option value=''></option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                                {errors.difficulty ? <span className="error">{errors.difficulty}</span>: null}
                            </div>
                            <div>
                                <label>Duración:</label>
                                <input className="input" name="duration" type='number' min='1' max='20' value={form.duration}  onChange={number => handleChange(number)} placeholder="Horas" required/> 
                                {errors.duration ? <span className="error">{errors.duration}</span>: null}
                            </div>
                            <div>
                                <label>Temporada:</label>
                                <select className="input" name="season" defaultValue={form.season} onChange={season => handleChange(season)} required>
                                    <option value=''></option>
                                    <option value='Winter'>Winter</option>
                                    <option value='Spring'>Spring</option>
                                    <option value='Summer'>Summer</option>
                                    <option value='Autumn'>Autumn</option>
                                </select>
                                {errors.season ? <span className="error">{errors.season}</span>: null}
                            </div>
                        </div>
                        <div className="col">
                            <label>Paises:</label>
                            <select className="inputCountries" name="countries" onChange={countries => handleChange(countries)} size="10" multiple required>
                                {countries && countries?.map((c) => 
                                    <option value={c.id} key={c.id} >{c.name}</option>
                                )}
                            </select>
                            {errors.countries ? <span className="error">{errors.countries}</span>: null}
                        </div>
                    </div>
                    <div>
                        <button className="newButton" type="submit">Añadir actividad turistica</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

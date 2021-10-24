import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
    const [pokemon, setPokemon] = useState("pikachu");
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonType, setPokemonType] = useState("");

    const handleChange = (e) => {
        setPokemon(e.target.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getPokemon();
    }

    const getPokemon = async () => {
        const dataArray = [];
        try {
            const pokemonApiUrl =  "https://pokeapi.co/api/v2/pokemon/" + pokemon;
            console.log("trying url " + pokemonApiUrl);
            const response = await axios.get(pokemonApiUrl);
            dataArray.push(response.data);
            setPokemon(response.data);
            setPokemonData(dataArray);
            setPokemonType(response.data.types[0].type.name);

            const pokemonTypeUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonType;

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        placeholder="Search for a Pokemon!"
                    />
                </label>
            </form>

            {pokemonData.map((data) => {
                return (
                    <div className="container">
                        <img src={data.sprites["front_default"]} />
                        <div className="divTable">
                            <div className="divTableBody">
                                <div className="divTableRow">
                                    <div className="divTableCell">Type</div>
                                    <div className="divTableCell">{pokemonType}</div>
                                </div>

                                <div className="divTableRow">
                                    <div className="divTableCell">Weak Against</div>
                                    <div className="divTableCell">{pokemonType}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );  
}

export default App;

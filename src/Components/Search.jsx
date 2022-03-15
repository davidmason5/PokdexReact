import axios from "axios";
import { useState } from "react";
import * as React from "react";
import { DataGrid, Column, Scrolling } from "devextreme-react/data-grid";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Search = () => {
  //Usestate variables
  const [pokemon, setPokemon] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState(["id", "name", "weight", "base_experience"]);
  const [pokemonType, setPokemonType] = useState("");

  //Get data from API
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const e = await axios.get(url);

      //Set useStates to data
      toArray.push(e.data);
      setPokemonData(toArray);

      console.table(e.data)
    } catch (e) {
      console.log(e);
    }
  };

  const getNewPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => response.json())
      .then((url) => setPokemonData({ pokemonData: url.results }));
    };

  const handleChange = (e) => {
    setPokemon(e.data.name)
    console.log('Pokemon Name :' + e.data.name)
    getNewPokemon() 
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  const getAllPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=898")
      .then((response) => response.json())
      .then((url) => setPokemons({ pokemons: url.results }));
  };

  return (
    <div className="App">
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button
            onClick={getAllPokemon}
            variant="contained"
            endIcon={<SendIcon />}
          >
            getAllPokemon
          </Button>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            dataSource={pokemons.pokemons}
            rowAlternationEnabled={true}
            showBorders={true}
            height={440}
            remoteOperations={true}
            onCellClick={handleChange}
            onRowClick={handleChange}
          >
            <Column 
              dataField="name"
              onCellClick={handleChange} 
            />
            <Scrolling mode="virtual" rowRenderingMode="virtual" />
          </DataGrid>
          <hr />
        </Grid>

        <Grid item xs={4}>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Enter Pokemon"
              />
            </label>
          </form>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            endIcon={<SendIcon />}
          >
            getPokemon
          </Button>
        </Grid>
        <Grid item xs={6}>
          <DataGrid
            dataSource={pokemonData.pokemonData}
            rowAlternationEnabled={true}
            showBorders={true}
            defaultColumns={pokemonData}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Search;

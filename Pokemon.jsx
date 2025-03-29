import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from './pokemonSlice';

export function Pokemon() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.pokemon);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(fetchPokemon(input));
    }
  };

  const playSound = () => {
    if (data) {
      const audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${data.name}.mp3`);
      audio.play().catch(e => console.log("Couldn't play sound:", e));
    }
  };

  return (
    <div className="pokemon-app">
      <h1>Pokémon Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Pokémon name"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div className="pokemon-card">
          <h2>{data.name.toUpperCase()}</h2>
          <img
            src={data.sprites.other['official-artwork'].front_default}
            alt={data.name}
            onClick={playSound}
            style={{ cursor: 'pointer' }}
          />
          <p>Height: {data.height / 10}m</p>
          <p>Weight: {data.weight / 10}kg</p>
          <button onClick={playSound}>Play Cry</button>
        </div>
      )}
    </div>
  );
}
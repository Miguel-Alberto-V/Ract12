import React, { useState } from 'react';
import axios from 'axios';

function CharacterLoader() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  let debounceTimer;

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
      setCharacters(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 1 || term === '') {
      // Limpiar el timer anterior si existe
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        handleSearch();
      }, 300);
    }
  };

  return (
    <div className="container">
      <h1>Personajes de Star Wars</h1>
      <button className="btn btn-primary mb-3" onClick={handleSearch} disabled={loading}>
        {loading ? 'Cargando Personajes...' : 'Cargar Personajes'}
      </button>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar personajes"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="row">
        {characters.map((character, index) => (
          <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">
                  <strong>Género:</strong> {character.gender}<br />
                  <strong>Año de nacimiento:</strong> {character.birth_year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterLoader;

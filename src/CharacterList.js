import React, { Component } from 'react';
import axios from 'axios';

class CharacterList extends Component {
  state = {
    characters: [],
  };

  componentDidMount() {
    axios.get('https://swapi.dev/api/people/')
      .then((response) => {
        this.setState({ characters: response.data.results });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="container">
        <h2>Personajes de Star Wars</h2>
        <div className="row">
          {this.state.characters.map((character, index) => (
            <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card" style={{marginBottom:15}}>
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
}

export default CharacterList;

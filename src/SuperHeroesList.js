import React, { Component } from 'react';
import { PUBLIC_KEY, PRIVATE_KEY } from './KEYS.js';
import './SuperHeroesList.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';

class SuperHeroesList extends Component {
  constructor(props) {
      super(props);
      this.state = { "allSuperHeroes": [] }
    }

  componentDidMount() {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    const that = this;

    axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=041913049d30965248efb127224d9eaa&hash=${hash}`)
      .then(function (data) {
        const allSuperHeroesFromData = data.data.data.results;
        console.log('this is allSuperHeroesFromData: ', allSuperHeroesFromData);
        let extractedSuperHeroes = [];
        for (var i = 0; i < allSuperHeroesFromData.length; i++) {
          const id = allSuperHeroesFromData[i]['id'];
          const name = allSuperHeroesFromData[i]['name'];
          const imageUrl = allSuperHeroesFromData[i]['thumbnail']['path'] + '.' + allSuperHeroesFromData[i]['thumbnail']['extension'];
          extractedSuperHeroes.push({'id': id, 'name': name, 'imageUrl': imageUrl});
        }
        that.setState({"allSuperHeroes": extractedSuperHeroes});
      })
      .catch(function (error) {
        console.log('there was an error: ', error);
      });
  }

  _showAllSuperHeroes(superHeroes) {
    console.log('all super heroes: ', superHeroes);
    return (
      superHeroes.map(function(hero) {
        return (
          <div key={hero.id} className="hero">
            <div className="hero-name">
              {hero.name}
            </div>
            <div className="hero-image-container">
              <img src={hero.imageUrl} className="hero-imageurl" />
            </div>
          </div>
        );
      })
    );
  }

  render() {
    if (this.state.allSuperHeroes.length > 0) {
      console.log('we have our heroes!!!');
      const allSuperHeroes = this.state.allSuperHeroes;
      return (
        <div className="heroes-container">
          {this._showAllSuperHeroes(allSuperHeroes)}
        </div>
      );
    } else {
      return (
        <div>
          Please wait...
        </div>
      );
    }
  }
}

export default SuperHeroesList;
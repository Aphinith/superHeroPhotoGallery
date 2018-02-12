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
    console.log('mounted');
    console.log('all super heroes: ', this.state.allSuperHeroes);
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

    axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=041913049d30965248efb127224d9eaa&hash=${hash}`)
      .then(function (data) {
        console.log('this is data: ', data);
      })
      .catch(function (error) {
        console.log('there was an error');
      });
  }

  render() {
    return (
      <div>
        This is the component that will render all the super heroes!
      </div>
    );
  }
}

export default SuperHeroesList;
import React, { Component } from 'react';
import { PUBLIC_KEY, PRIVATE_KEY } from './KEYS.js';
import './SuperHeroesList.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class SuperHeroesList extends Component {
  constructor(props) {
      super(props);
      this.state = { "allSuperHeroes": [],
                     "modalBackgroundDisplay": "modal-hide",
                     "slideIndex": 0 }
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

  _toggleCarousel(ev) {
    let slideIndex = ev.target.dataset.index;
    if (slideIndex === undefined) {
      slideIndex = 0;
    }
    console.log('slideIndex: ', slideIndex);

    if (this.state.modalBackgroundDisplay === "modal-hide") {
      this.setState({"modalBackgroundDisplay": "modal-show",
                     "slideIndex": slideIndex });
    } else {
      this.setState({"modalBackgroundDisplay": "modal-hide",
                     "slideIndex": slideIndex });
    }
  }

  _showAllSuperHeroes(superHeroes) {
    const that = this;
    return (
      superHeroes.map(function(hero, index) {
        return (
          <div key={hero.id} className="hero" data-index={index} onClick={ ev => that._toggleCarousel(ev) }>
            <div className="hero-name" data-index={index}>
              {hero.name}
            </div>
            <div className="hero-image-container" data-index={index}>
              <img src={hero.imageUrl} className="hero-imageurl" data-index={index}/>
            </div>
          </div>
        );
      })
    );
  }

  _doNothingOnClick(ev) {
    ev.stopPropagation();
  }

  render() {
    if (this.state.allSuperHeroes.length > 0) {
      const allSuperHeroes = this.state.allSuperHeroes;
      return (
        <div>
          <div className="heroes-container">
            {this._showAllSuperHeroes(allSuperHeroes)}
          </div>
          <div className={`modal-background ${this.state.modalBackgroundDisplay}`} onClick={ ev => this._toggleCarousel(ev) }>
            <div className="carousel-container" onClick={ ev => this._doNothingOnClick(ev) }>
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={60}
                totalSlides={3}
                currentSlide={this.state.slideIndex}
              >
                <Slider>
                  <Slide index={0}>
                    <img src={allSuperHeroes[0]['imageUrl']} className="carousel-hero-imageurl" />
                  </Slide>
                  <Slide index={1}>
                    <img src={allSuperHeroes[1]['imageUrl']} className="carousel-hero-imageurl" />
                  </Slide>
                  <Slide index={2}>
                    <img src={allSuperHeroes[2]['imageUrl']} className="carousel-hero-imageurl" />
                  </Slide>
                </Slider>
                <ButtonBack>Previous</ButtonBack>
                <ButtonNext>Next</ButtonNext>
              </CarouselProvider>
            </div>
          </div>
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
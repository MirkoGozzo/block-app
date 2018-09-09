import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Particles from 'react-particles-js';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import eE from './easterEgg.png';
import './App.css';

const particleParams = {
  "particles": {
   "number": {
     "value": 80,
     "density": {
       "enable": true,
       "value_area": 700
     }
   },
   "color": {
     "value": "#ffffff"
   },
   "shape": {
     "type": "circle",
     "stroke": {
       "width": 0,
       "color": "#000000"
     },
     "polygon": {
       "nb_sides": 5
     },
   },
   "opacity": {
     "value": 0.5,
     "random": false,
     "anim": {
       "enable": false,
       "speed": 1,
       "opacity_min": 0.1,
       "sync": false
     }
   },
   "size": {
     "value": 3,
     "random": true,
     "anim": {
       "enable": false,
       "speed": 40,
       "size_min": 0.1,
       "sync": false
     }
   },
   "line_linked": {
     "enable": true,
     "distance": 150,
     "color": "#ffffff",
     "opacity": 0.4,
     "width": 1
   },
   "move": {
     "enable": true,
     "speed": 6,
     "direction": "none",
     "random": false,
     "straight": false,
     "out_mode": "out",
     "bounce": false,
     "attract": {
       "enable": false,
       "rotateX": 600,
       "rotateY": 1200
     }
   }
 },
 "interactivity": {
   "detect_on": "window",
   "events": {
     "onhover": {
       "enable": true,
       "mode": "grab"
     },
     "onclick": {
       "enable": true,
       "mode": "push"
     },
     "onresize": {
        "enable": true,
        "density_auto": true,
        "density_area": 400 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
      }
   },
   "modes": {
     "grab": {
       "distance": 140,
       "line_linked": {
         "opacity": 1
       }
     },
     "bubble": {
       "distance": 400,
       "size": 40,
       "duration": 2,
       "opacity": 8,
       "speed": 3
     },
     "repulse": {
       "distance": 200,
       "duration": 0.4
     },
     "push": {
       "particles_nb": 4
     },
     "remove": {
       "particles_nb": 2
     }
   }
 },
 "retina_detect": true
          }




class App extends Component {
  constructor() {
    super();
    this.state = {
      btcPrice: false,
      ethPrice: false,
      temp: false,
      temp_c: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ btcPrice: data.BTC.EUR, temp: data.temperature, tempCelsius : ((data.temperature- 32) * 5 / 9).toFixed(3), ethPrice: data.ETH.EUR,}));

  }
  render() {
    const { btcPrice } = this.state;
    const { ethPrice } = this.state;
    const { temp } = this.state;
    const { tempCelsius } = this.state;

    return (
      <div className="App-back">

        <div  className="App-card">
          <div className="App-quote">
            The blockchain cannot be described just as a revolution. It is a tsunami-like phenomenon, slowly advancing and gradually enveloping everything along its way by the force of its progression.
          </div>
                    <p className="App-textCenter">
                      <img src={ eE } alt="Easter Egg" />
                    </p>
              <Flippy className=""
                flipOnHover={false} // default false
                flipOnClick={true} // default false
                flipDirection="vertical" // horizontal or vertical
                ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                // if you pass isFlipped prop component will be controlled component.
                // and other props, which will go to div
                style={{ width: 'auto', height: 'auto', marginLeft: "40%", marginRight: "40%" }} /// these are optional style, it is not necessary
              >
                <FrontSide className="App-cardFront"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                {btcPrice
                  ?
                  <div>
                   <p className="App-title">
                    Bitcoin Price:
                  </p>
                  <p className="App-title">
                    {btcPrice} EUR
                  </p>
                  <p className="App-title">
                   Ethereum Price:
                 </p>
                  <p className="App-title">
                    {ethPrice} EUR
                  </p>
                  </div>
                  : <p className="App-title">Loading...</p>
                }
                </FrontSide>
                <BackSide  className="App-cardBack"
                  style={{ backgroundColor: 'transparent'}}>
                  {temp
                    ?
                      <div>
                         <p className="App-title">
                          The temperature in Chiasso is:
                        </p>
                        <p className="App-title">
                             {temp}  °F
                        </p>
                        <p className="App-title">
                             {tempCelsius}  °C
                        </p>
                      </div>
                    : <p className="App-title">Loading...</p>
                  }
                </BackSide>
              </Flippy>

            </div>

          <Particles
          params={
                 particleParams
               }
               style={{
                 width: '100%',
                 zIndex: -1
               }}
          />
      </div>
    );
  }
}
export default App

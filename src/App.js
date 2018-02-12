import React, { Component } from 'react';

import AudioContextProvider from './AudioContextProvider'
import Frequency from './Frequency'
import Tone from './tone/tone.component'

export default class App extends Component {
  render() {
      return (
        <AudioContextProvider>
          <Frequency frequency={300} startHertz={15} endHertz={5} step={1} intervalTime={60}>
            { (frequency, hertz, interval) => (
                <Tone frequency={frequency} hertz={hertz} intervalTime={interval}>
                  <div><h1>Hello World again!</h1></div>
                </Tone>
              )
            }
          </Frequency>
        </AudioContextProvider>
      )
  }
}

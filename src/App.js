import React, { Component } from 'react';

import AudioContextProvider from './AudioContextProvider'
import Frequency from './Frequency'
import Tone from './tone/tone.component'

export default class App extends Component {
  render() {
      return (
        <AudioContextProvider>
          <Frequency>
            { (frequency, hertz) => {
              return (<Tone frequency={frequency} hertz={hertz}>
                <div><h1>Hello World again!</h1></div>
              </Tone>)
            }}
          </Frequency>
        </AudioContextProvider>
      )
  }
}

import React, { Component } from 'react';

import AudioContextProvider from './AudioContextProvider'
import Tone from './tone/tone.component'

export default class App extends Component {
  render() {
      return (
        <AudioContextProvider>
          <Tone>
            <div><h1>Hello World again!</h1></div>
          </Tone>
        </AudioContextProvider>
      )
  }
}

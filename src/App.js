import React, { Component } from 'react';

import AudioContextProvider from './AudioContextProvider'
import Frequency from './Frequency'
import Tone from './Tone'
import Strobe from './Strobe'

export default class App extends Component {
  render() {
      return (
        <AudioContextProvider>
          <Frequency frequency={400} startHertz={15} endHertz={5} step={1} intervalTime={60}>
            { (frequency, hertz, interval) => (
                <Tone frequency={frequency} hertz={hertz} intervalTime={interval}>
                  <Strobe hertz={hertz} />
                </Tone>
              )
            }
          </Frequency>
        </AudioContextProvider>
      )
  }
}

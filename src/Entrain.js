import React, { Component } from 'react';

import AudioContextProvider from './AudioContextProvider'
import Frequency from './Frequency'
import BinauralBeat from './BinauralBeat'
import Strobe from './Strobe'

export default class Entrain extends Component {
  render() {
      return (
        <AudioContextProvider>
          <Frequency
            startHertz={15}
            endHertz={5}
            step={1}
            intervalTime={60}
          >
            { (frequency, hertz, interval) => (
                <BinauralBeat frequency={frequency} hertz={hertz} intervalTime={interval}>
                  <Strobe hertz={hertz} color="#5c4aff" complementary={true}/>
                </BinauralBeat>
              )
            }
          </Frequency>
        </AudioContextProvider>
      )
  }
}

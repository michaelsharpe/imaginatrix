import React from 'react';
import Entrain from './Entrain';

describe('Entrain', () => {
  const entrain = shallow(<Entrain />);

  it('renders the intial audio context provider', () => {
    expect(entrain.find('AudioContextProvider').exists()).toBe(true);
  });

  it('renders the frequency module', () => {
    expect(entrain.find('Frequency').exists()).toBe(true)
  })
});

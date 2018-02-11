import React from 'react';
import Tone from './tone.component';

describe('Tone', () => {
  const app = shallow(<Tone />);

  it('renders', () => {
    expect(app.find('div').exists()).toBe(true);
  });
});

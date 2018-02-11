import React from 'react';
import App from './../src/App';

describe('App', () => {
  const app = shallow(<App />);

  it('renders the intial audio context', () => {
    expect(app.find('AudioContextProvider').exists()).toBe(true);
  });
});

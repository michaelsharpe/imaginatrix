import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Frequency extends Component {
  constructor(props) {
    super(props);
    // Time at each frequency
    // this.intervalTime = 3 * 60 * 1000
    this.intervalTime = 3000
    this.interval = null

    this.state = {
      frequency: 200,
      hertz: 15,
      step: 2
    }
  }

  step() {
    const { hertz, step, frequency } = this.state

    // assert that we reach 0.5hz regardless of the step value
    console.log("hertz: ", hertz, " Step: ", step)
    if (hertz <= step) {
      this.setState({
        ...this.state,
        step: 0.5
      })

      // Lowest state is 0.5
      clearInterval(this.interval)
    }

    const nextHertz = hertz - step
    const nextFrequency = frequency - nextHertz

    console.log("next frequency", nextHertz, nextFrequency)

    this.setState({
      ...this.state,
      hertz: nextHertz,
      frequency: nextFrequency
    })
  }

  componentDidMount() {
    this.interval = window.setInterval(this.step.bind(this), this.intervalTime)
  }

  render() {
    return (
      <div>
        {this.props.children(this.state.frequency, this.state.hertz)}
      </div>
    )
  }
}

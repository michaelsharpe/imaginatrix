import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactInterval from 'react-interval'

export default class Frequency extends Component {
  static defaultProps = {
    frequency: 200,
    startHertz: 15,
    endHertz: 2,
    step: 1,
    intervalTime: 1
  }

  constructor(props) {
    super(props);
    const { frequency, startHertz, endHertz, step, intervalTime } = this.props

    this.intervalTime = intervalTime
    this.interval = null

    this.state = {
      frequency,
      endHertz,
      currentHertz: startHertz,
      step,
    }
  }

  step() {
    const { currentHertz, endHertz, step, frequency } = this.state

    // Stop when our current hertz reaches the desired end hertz
    if (currentHertz <= endHertz) {
      window.clearInterval(this.interval)
    }

    const nextHertz = currentHertz - step
    const nextFrequency = frequency - nextHertz

    this.setState({
      ...this.state,
      currentHertz: nextHertz,
      frequency: nextFrequency
    })
  }

  componentDidMount() {
    this.interval = window.setInterval(this.step.bind(this), (this.intervalTime * 1000))
  }

  render() {
    return (
      <div>
        {this.props.children(this.state.frequency, this.state.currentHertz, this.intervalTime)}
      </div>
    )
  }
}

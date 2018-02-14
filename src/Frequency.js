import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactInterval from 'react-interval'
const parser = require('note-parser')

// Notes:
// Add session length
// Calculate descent, time in state, and gradual return
//

export default class Frequency extends Component {
  static defaultProps = {
    tuning: 432,
    frequency: 200,
    startHertz: 15,
    endHertz: 2,
    step: 1,
    intervalTime: 1,
  }

  // D = 293.7
  // A = 440

  static propTypes = {
    tuning: PropTypes.number,
    frequency: PropTypes.number,
    startHertz: PropTypes.number,
    endHertz: PropTypes.number,
    step: PropTypes.number,
    intervalTime: PropTypes.number,
    note: PropTypes.string
  }

  constructor(props) {
    super(props);
    const { startHertz } = this.props

    this.interval = null

    this.state = {
      currentHertz: startHertz,
      frequency: this.getFrequency()
    }
  }

  getFrequency() {
    if(!this.props.note) {
      return this.props.frequency
    }

    return parser.freq(this.props.note, this.props.tuning)
  }

  step() {
    const { currentHertz } = this.state
    const { endHertz, step, frequency } = this.props

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
    this.interval = window.setInterval(this.step.bind(this), (this.props.intervalTime * 1000))
  }

  render() {
    return (
      <div>
        {this.props.children(this.state.frequency, this.state.currentHertz, this.props.intervalTime)}
      </div>
    )
  }
}

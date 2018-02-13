import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactInterval from 'react-interval'
import Chroma from 'chroma-js'

// Strobe component is made is flash a div at a determined frequency between two
// supplied colors, or set to complementary colors
export default class Strobe extends Component {
  static defaultProps = {
    hertz: 15,
    complementary: false,
    backgroundColor: '#000000',
    color: '#ffffff',
    start: true,
    alternate: false
  }

  static propTypes = {
    hertz: PropTypes.number,
    backgroundColor: PropTypes.string,
    complementary: PropTypes.bool,
    color: PropTypes.string,
    intervalTime: PropTypes.number,
    start: PropTypes.bool,
    alternate: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.interval = null

    this.state = {
      displayFlash: false
    }
  }

  getComplementaryColor(color) {
    const [hue, saturation, lightness] = Chroma(color).hsv()
    return Chroma.hsv(hue + 180, saturation, lightness)
  }

  render() {
    const { alternate, displayFlash } = this.state
    const { complementary, backgroundColor, color } = this.props

    console.log()

    const sharedStyle = {
      flex: 1,
      height: '100vh',
    }

    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      height: '100vh'
    }

    const backgroundStyle = {
      ...sharedStyle,
      backgroundColor: complementary ? this.getComplementaryColor(color) : backgroundColor,
    }

    const flashStyle = {
      ...sharedStyle,
      backgroundColor: this.props.color,
    }

    return (
      <div style={containerStyle}>
        <div style={backgroundStyle}>
          { displayFlash && <div style={flashStyle}></div>}
        </div>

        <div style={ alternate ? flashStyle : backgroundStyle }>
          { displayFlash && <div style={alternate ? backgroundStyle : flashStyle }></div> }
        </div>

        <ReactInterval
          timeout={ 1000 / this.props.hertz }
          enabled={ true }
          callback={() => this.setState({...this.state, displayFlash: !this.state.displayFlash})}
        />
      </div>
    )
  }
}

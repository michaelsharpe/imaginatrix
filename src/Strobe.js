import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactInterval from 'react-interval'

// Strobe component is made is flash a div at a determined frequency between two
// supplied colors, or set to complimentary colors
export default class Strobe extends Component {
  static defaultProps = {
    hertz: 15,
    complimentary: false,
    backgroundColor: '#000000',
    flashColor: '#ffffff',
    start: true,
    alternate: false
  }

  static propTypes = {
    hertz: PropTypes.number,
    backgroundColor: PropTypes.string,
    complimentary: PropTypes.bool,
    flashColor: PropTypes.string,
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

  render() {
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
      backgroundColor: this.props.backgroundColor,
    }

    const flashStyle = {
      ...sharedStyle,
      backgroundColor: this.props.flashColor,
    }

    const { alternate, displayFlash } = this.state

//this.state.displayFlash
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

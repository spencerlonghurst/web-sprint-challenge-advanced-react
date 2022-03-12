import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/result';

const initialState = {
  grid: {
    x: 2,
    y: 2,
  },
    steps: 0,
    email: '',
    errorMessage: '',
    successMessage: '',
}

export default class AppClass extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }


  changeRight = () => {
    if (this.state.grid.x < 3) {
      this.setState({
        ...this.state,
        grid: { ...this.state.grid, x: this.state.grid.x + 1 },
        steps: this.state.steps + 1 
      })
    } else {
      this.setState({ ...this.state, errorMessage: `You can't go right`})   
    }

    
  }

  changeLeft = () => {

    if (this.state.grid.x > 1) {
      this.setState({
        ...this.state, 
        grid: { ...this.state.grid, x: this.state.grid.x - 1 },
        steps: this.state.steps + 1 
      })
    } else {
      this.setState({ ...this.state, errorMessage: `You can't go left`}) 
    }
    
    }

  changeDown = () => {
    if (this.state.grid.y < 3) {
      this.setState({
        ...this.state,
        grid: { ...this.state.grid, y: this.state.grid.y + 1 },
        steps: this.state.steps + 1 
      })
    } else {
      this.setState({ ...this.state, errorMessage: `You can't go down`}) 
    }
    
  }

  changeUp = () => {
    if (this.state.grid.y > 1) {
      this.setState({
        ...this.state,
        grid: { ...this.state.grid, y: this.state.grid.y - 1 },
        steps: this.state.steps + 1 
      })
    } else {
      this.setState({ ...this.state, errorMessage: `You can't go up`}) 
    }
    
  }

  onToDoEmailChange = evt => {
    const { value } = evt.target;
    this.setState({
      ...this.state, email: value 
    })
  }

  resetForm = () => this.setState({ 
    ...this.state, 
    email: '',
  })
  
  resetBtn = () => this.setState({ ...this.state,
    grid: {
      x: 2,
      y: 2,
    },
    steps: 0,
    email: '',
    errorMessage: '',
    successMessage: ''
  })
 

  onSubmit = evt => {
    evt.preventDefault()
    axios.post(URL, { steps: this.state.steps, y: this.state.grid.y,  x: this.state.grid.x, email: this.state.email })
    .then(res => {
      this.setState({
        ...this.state,
        successMessage: res.data.message,
        email: this.state.email,
        steps: this.state.steps,
        grid: {
          x: this.state.grid.x,
          y: this.state.grid.y
        }
      })
      this.resetForm()
    })
    .catch(err => {
      this.setState({ ...this.state, errorMessage: err.response.data.message })  
    })
  }

  
  render() {



    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.grid.x}, {this.state.grid.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times' }</h3>
        </div>
        <div id="grid">
          <div className={`square ${this.state.grid.x === 1 && this.state.grid.y === 1  ? 'active' : ''}`}>{`${this.state.grid.x === 1 && this.state.grid.y === 1  ? 'B' : ''}`}</div>
          <div className={`square ${this.state.grid.x === 2 && this.state.grid.y === 1  ? 'active' : ''}`}>{`${this.state.grid.x === 2 && this.state.grid.y === 1  ? 'B' : ''}`}</div>
          <div className={`square ${this.state.grid.x === 3 && this.state.grid.y === 1  ? 'active' : ''}`}>{`${this.state.grid.x === 3 && this.state.grid.y === 1  ? 'B' : ''}`}</div>
          <div className={`square ${this.state.grid.x === 1 && this.state.grid.y === 2  ? 'active' : ''}`}>{`${this.state.grid.x === 1 && this.state.grid.y === 2  ? 'B' : ''}`}</div>
          <div className={`square ${this.state.grid.x === 2 && this.state.grid.y === 2  ? 'active' : ''}`}>{`${this.state.grid.x === 2 && this.state.grid.y === 2  ? 'B' : ''}`}</div>
          <div className={`square ${this.state.grid.x === 3 && this.state.grid.y === 2  ? 'active' : ''}`}>{`${this.state.grid.x === 3 && this.state.grid.y === 2  ? 'B' : ''}`}</div>
          <div className={`square ${this.state.grid.x === 1 && this.state.grid.y === 3  ? 'active' : ''}`}>{`${this.state.grid.x === 1 && this.state.grid.y === 3  ? 'B' : ''}`}</div>
          <div className={`square ${this.state.grid.x === 2 && this.state.grid.y === 3  ? 'active' : ''}`}>{`${this.state.grid.x === 2 && this.state.grid.y === 3  ? 'B' : ''}`}</div>
          <div className={`square ${this.state.grid.x === 3 && this.state.grid.y === 3  ? 'active' : ''}`}>{`${this.state.grid.x === 3 && this.state.grid.y === 3  ? 'B' : ''}`}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.errorMessage}{this.state.successMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.changeLeft}>LEFT</button>
          <button id="up" onClick={this.changeUp}>UP</button>
          <button id="right" onClick={this.changeRight}>RIGHT</button>
          <button id="down" onClick={this.changeDown}>DOWN</button>
          <button id="reset" onClick={this.resetBtn}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onToDoEmailChange} value={this.state.email}></input> 
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

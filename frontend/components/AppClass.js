import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/result';

const initialState = {
  grid: {
    x: 2,
    y: 2,
    steps: 0,
    email: '' }
}

export default class AppClass extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  changeRight = () => {
    this.setState({
      ...this.state,
      grid: { ...this.state.grid, x: this.state.grid.x + 1 }
    })
  }

  changeLeft = () => {
    this.setState({
      ...this.state, 
      grid: { ...this.state.grid, x: this.state.grid.x - 1 }
    })
    }

  changeDown = () => {
    this.setState({
      ...this.state,
      grid: { ...this.state.grid, y: this.state.grid.y - 1 }
    })
  }

  changeUp = () => {
    this.setState({
      ...this.state,
      grid: { ...this.state.grid, y: this.state.grid.y + 1 }
    })
  }


 



  // const [x, y] = getCoordinates(grid)
  //   console.log(`(${x}, ${y})`)

//   onEmailFormSubmit = event => {
//     event.preventDefault();
//   }

// postNewX = () => {
//   axios.post(URL, )
//   .then(res => {
//     this.setState({
//       ...this.state,
//         grid: []
//     })
//   })
  
//   .catch(err => {
//     debugger
//   })
// }
// onXBtnSubmit = () => {
//   this.postNewX();
// }










  componentDidMount() {
   
  }

  render() {
    console.log('state is', this.state)



    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.changeLeft}>LEFT</button>
          <button id="up" onClick={this.changeUp}>UP</button>
          <button id="right" onClick={this.changeRight}>RIGHT</button>
          <button id="down" onClick={this.changeDown}>DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit" onSubmit={this.onEmailFormSubmit}></input>
        </form>
      </div>
    )
  }
}

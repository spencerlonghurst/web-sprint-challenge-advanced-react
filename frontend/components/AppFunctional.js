import React, { useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/result';

export default function AppFunctional(props) {

const [grid, setGrid] = useState({x: 2, y: 2});
const [steps, setSteps] = useState(0);
const [email, setEmail] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

const changeRight = () => {
  if (grid.x < 3) {
    setGrid({ ...grid, 'x': grid.x + 1 })
    setSteps(steps + 1)
  } else {
    setErrorMessage(`You can't go right`)
  }
}

const changeLeft = () => {
  if (grid.x > 1) {
    setGrid({ ...grid, 'x': grid.x  - 1 })
    setSteps(steps + 1)
  } else {
    setErrorMessage(`You can't go left`)
  }
}

const changeDown = () => {
  if (grid.y < 3) {
    setGrid({ ...grid, 'y': grid.y  + 1 })
    setSteps(steps + 1)
  } else {
    setErrorMessage(`You can't go down`)
  }
}

const changeUp = () => {
  if (grid.y > 1) {
    setGrid({ ...grid, 'y': grid.y  - 1 })
    setSteps(steps + 1)
  } else {
    setErrorMessage(`You can't go up`)
  }
}

const onToDoEmailChange = evt => {
  const { value } = evt.target;
  setEmail(value);
}

const resetForm = () => {
  setEmail('')
}

const resetBtn = () => {
  setGrid({x: 2, y: 2});
  setSteps(0);
  setEmail('');
  setErrorMessage('');
  setSuccessMessage('');
}



const onSubmit = evt => {
  evt.preventDefault()
  axios.post(URL, {steps: steps, y: grid.y, x: grid.x, email: email})
  .then(res => {
    setSuccessMessage(res.data.message);
    setEmail('')
    resetForm()
  })
  .catch(err => {
    setErrorMessage(err.response.data.message)
  })
}

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({grid.x}, {grid.y})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times' }</h3>
      </div>
      <div id="grid">
        <div className={`square ${grid.x === 1 && grid.y === 1  ? 'active' : ''}`}>{`${grid.x === 1 && grid.y === 1  ? 'B' : ''}`}</div>
        <div className={`square ${grid.x === 2 && grid.y === 1  ? 'active' : ''}`}>{`${grid.x === 2 && grid.y === 1  ? 'B' : ''}`}</div>
        <div className={`square ${grid.x === 3 && grid.y === 1  ? 'active' : ''}`}>{`${grid.x === 3 && grid.y === 1  ? 'B' : ''}`}</div>
        <div className={`square ${grid.x === 1 && grid.y === 2  ? 'active' : ''}`}>{`${grid.x === 1 && grid.y === 2  ? 'B' : ''}`}</div>
        <div className={`square ${grid.x === 2 && grid.y === 2  ? 'active' : ''}`}>{`${grid.x === 2 && grid.y === 2  ? 'B' : ''}`}</div>
        <div className={`square ${grid.x === 3 && grid.y === 2  ? 'active' : ''}`}>{`${grid.x === 3 && grid.y === 2  ? 'B' : ''}`}</div>
        <div className={`square ${grid.x === 1 && grid.y === 3  ? 'active' : ''}`}>{`${grid.x === 1 && grid.y === 3  ? 'B' : ''}`}</div>
        <div className={`square ${grid.x === 2 && grid.y === 3  ? 'active' : ''}`}>{`${grid.x === 2 && grid.y === 3  ? 'B' : ''}`}</div>
        <div className={`square ${grid.x === 3 && grid.y === 3  ? 'active' : ''}`}>{`${grid.x === 3 && grid.y === 3  ? 'B' : ''}`}</div>
      </div>
      <div className="info">
        <h3 id="message">{errorMessage}{successMessage}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={changeLeft}>LEFT </button>
        <button id="up" onClick={changeUp}>UP</button>
        <button id="right" onClick={changeRight}>RIGHT</button>
        <button id="down" onClick={changeDown}>DOWN</button>
        <button id="reset" onClick={resetBtn}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onToDoEmailChange} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

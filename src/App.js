import React, {useState, useEffect} from 'react';
import Die from './components/Die';
import './App.css';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti';

function App() {

  const [tenzies, setTenzies] = useState(false);
  const [dice, setDice] = useState(() => rollDice());

  // If the dice are all the same value, the player wins
  useEffect(() => {
    const allSelected = dice.every(die => die.selected) ? true : false;
    const allSameValue = dice.every(die => dice[0].value === die.value) ? true : false;
    if (allSelected && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function rollDice() {
    setTenzies(false)
    const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push({
          id: nanoid(),
          value: Math.floor(Math.random() * 6) + 1,
          selected: false
        })
      }
      return newDice
  }

  // Randomize all the dice
  function Randomize() {
    setDice(prevDice => 
      prevDice.map(die => 
          !die.selected 
          ? ({...die, value: Math.floor(Math.random() * 6) + 1})  // If the die is not selected, randomize it
          : die //else return the die
      )
    )
  }

  // Toggle the selected state of a die
  function toggle(id){
    setDice(prevDice => 
      dice.map(die => die.id === id ? {...die, selected: !die.selected} : die))
  }

  const dieElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      selected={die.selected}
      toggle={() => toggle(die.id)}
    />
  ))

  return (
    <main className="App">
      {tenzies ? <Confetti /> : null}
      <header className='header'>
        <h1 className='title'>Tenzies</h1>
        <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </header>
      <div className='dice--container'>
        {dieElements}
      </div>
      <button 
        className='roll-Btn' 
        onClick={() => tenzies ? setDice(rollDice()) : Randomize()}
      >
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}

export default App;
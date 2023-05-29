import React, { useRef, useState } from 'react';
import './App.css';
import { getRandomQuestion } from './Questions.js';
import { TimedQuestion } from './Components/TimedQuestion.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

function App() {
  const [currQuestion, setCurrQuestion] = useState(getRandomQuestion())
  const [input, setInput] = useState("")
  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(60);
  

  const answerRef = useRef(null);

  //figure out how to move timer specific parts to 
  //timed question component
  //starts a new round
  function newRound() {
    setCurrQuestion(getRandomQuestion());
    setInput("");
    setRound(round + 1);
    setScore(0)
    setCount(60);
  }

  //temporary formula, its kinda bad
  function answerError(given, expected) {
    const percentError = Math.abs((given - expected) / expected) * 100;
    return Math.round(percentError);
  }

  //temporary scoring function, also sucks
  function answerScore(errorVal) {
    return 5000 - errorVal * 50;
  }

  //logs the current input in the answer bar
  const handleInput = event => {
    setInput(event.target.value);
  }

  //alerts the user to if their answer is true or false when the submit button is pressed
  const handleSubmit = () => {
    const error = answerError(input, currQuestion.answer)
    alert("error: " + error + "%,  answer: " + currQuestion.answer);
    answerScore(error);
    answerRef.current.reset();
  }

  return (
    <Container id="main-container" className="d-grid h-100">
      <TimedQuestion 
        currQuestion={currQuestion}
        count={count}
        setCount={setCount}
        className="questionBox"
      />
      <Form ref={answerRef} id="answer-form" className="w-100">
      <InputGroup size="lg" onChange = {handleInput}>
        <Form.Control
          placeholder={"Enter answer in " + currQuestion.unit} 
        />
        <InputGroup.Text>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </InputGroup.Text>
      </InputGroup>
        <div id="round-button" className="d-grid">
          <Button onClick={newRound}>New Round</Button>
        </div>
      </Form>
      <Table striped bordered className="bottomTable">
        <tbody>
          <tr>
            {Array.from({ length: 4 }).map((_, index) => (
              <td key={index}>Player {index + 1}:    {score}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default App;

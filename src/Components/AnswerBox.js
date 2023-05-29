import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const AnswerBox = () => {
    const [input, setInput] = useState('');
    return (
        <div>
            <Form>
                <InputGroup size="lg" onChange = {handleInput}>
                    <Form.Control
                        placeholder={"Enter answer in " + currQuestion.unit} 
                    />
                    <InputGroup.Text>
                        <Button onClick={handleSubmit}>
                            Submit
                        </Button>
                    </InputGroup.Text>
                </InputGroup>
            <div>
            <Button onClick={newRound}>New Round</Button>
        </div>
            </Form>
        </div>
    )
}
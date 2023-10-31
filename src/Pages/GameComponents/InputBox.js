import React from 'react';
import './css/InputBox.css'

export const InputBox = ({ input, setInput, currQuestion, handleSubmit }) => {
    const handleClick = (e) => {
        e.preventDefault();
        if (input != "") {
            handleSubmit();
        }
    }

    return (
        <div>
            <form className='inputBox shadow'>
                <input
                    type="number"
                    min="0"
                    placeholder={"Enter number of " + currQuestion.unit}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className='submitBox'>
                    <button className={(input != "") ? "submit" : "submit-locked"} onClick={handleClick}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InputBox;
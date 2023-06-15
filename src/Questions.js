const questionList = [
    { prompt: "How much does a rhino weigh", answer: 4000, unit: "pounds", factor: "" },
    { prompt: "How many years ago was the last caveman alive", answer: 10000, unit: "years", factor: "" },
    { prompt: "How many years has the oldest tree been alive", answer: 5000, unit: "years", factor: "" },
    { prompt: "How many countries are there", answer: 195, unit: "countries", factor: "" },
    { prompt: "How many countries drive on the left side of the road", answer: 76, unit: "countries", factor: "" },
    { prompt: "How many million years ago was the first dinosaur", answer: 230, unit: "years (millions)", factor: "" },
    { prompt: "What is the average price of a deserted island", answer: 1500000, unit: "dollars", factor: "" },
    { prompt: "What does the most expensive item on Amazon cost", answer: 2000000, unit: "dollars", factor: "" },
    { prompt: "How many teeth does an adult alligator have", answer: 75, unit: "teeth", factor: "" },
    { prompt: "How many houses are there in the world", answer: 2300, unit: "houses (millions)", factor: "" },
    { prompt: "How many languages are spoken in the world today", answer: 7100, unit: "languages", factor: "" },
    { prompt: "What is the weight of the largest recorded pumpkin", answer: 2624, unit: "pounds", factor: "" },
    { prompt: "What is the average weight of a blue whale", answer: 200000, unit: "pounds", factor: "" },
    { prompt: "How many miles long is the Great Wall of China", answer: 13170, unit: "miles", factor: "" },
    { prompt: "What is the maximum recorded depth of the ocean", answer: 36000, unit: "feet", factor: "" },
    { prompt: "How many species of fish are estimated to exist", answer: 33000, unit: "species", factor: "" }
  ];
  
//question ideas: highest score of something, more distance stuff, berg's members of congress thing. 

export function calculateScore(input, question) {
  const given = Number(input);
  const expected = Number(question.answer);

  if (given <= 0) {
    return 0;
  }

  let baseScore;

  if (given < expected) {
    baseScore = 1 - (Math.log(expected) - Math.log(given));
  } else if (given > expected) {
    const logGiven = (2 * expected) - given; 
    baseScore = 1 - (Math.log(expected) - Math.log(logGiven));
  } else {
    baseScore = 1;
  }

  return baseScore > 0 ? Math.floor(5000 * baseScore) : 0;
}


/*
  let factor = 1.0;
  
  if (question.factor !== "") {
    factor = Number(question.factor);
  }
  /*


export function calculateScore(input, question) {
    const inputNumber = Number(input);
    const expectedNumber = Number(question.answer);
    
  
    const difference = Math.abs(inputNumber - expectedNumber);
  
    // Determine the benchmark distance based on the factor and expected answer
    const benchmarkDistance = expectedNumber * factor; //make dependent on percent error curve
  
    // Calculate the normalized distance as a fraction of the benchmark distance
    const normalizedDistance = difference / benchmarkDistance;
  
    // Calculate the score using a quadratic function to reward proximity to the answer
    const score = Math.floor(5000 * (1 - Math.pow(normalizedDistance, 2)));
  
    // Ensure the score does not go below zero
    return Math.max(0, score);
}

*/

export function getGameQuestions(roundCount) {
  const gameQuestions = questionList
    .sort(() => Math.random() - 0.5)
    .slice(0, roundCount);
  return gameQuestions;
}
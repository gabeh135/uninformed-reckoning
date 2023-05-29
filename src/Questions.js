//temporary list of around 20 questions to be randomly chosen from. Eventually I'll change it to autofill
//into a question object, i'm planning on either a json file or a spreadsheet. Maybe have the game able to input questions too.
//I will also soon make better prompts
const questionList = [
    { prompt: "How much does a rhino weigh", answer: 3, unit: "tons"}, //make pounds
    { prompt: "How many field players are in a Water Polo team", answer: 6, unit: "players"},
    { prompt: "How many years ago was the last caveman alive", answer: 10000, unit: "years"},
    { prompt: "How many years has the oldest tree been alive", answer: 5000, unit: "years"},
    { prompt: "How many countries are there", answer: 195, unit: "countries"},
    { prompt: "How many countries drive on the left side of the road", answer: 76, unit: "countries"},
    { prompt: "How many million years ago was the first dinosaur", answer: 230, unit: "million years"},
    { prompt: "What is the average price of a deserted island", answer: 1500000, unit: "dollars"},
    { prompt: "What does the most expensive item on Amazon cost", answer: 2000000, unit: "dollars"},
    { prompt: "How old was the oldest human", answer: 122, unit: "years"},
    { prompt: "How many teeth does an adult alligator have", answer: 75, unit: "teeth"},
    { prompt: "How many members of congress are there", answer: 533, unit: "members"}, //maybe
    { prompt: "How many houses are there in the world", answer: 2300000000, unit: "houses"},
    { prompt: "How many yards are there in a mile", answer: 1760, unit: "yards"}, //replace yards with more interesting unit
]

//cool 

const gameQuestions = questionList
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

export const getRandomGameQuestion = () => {
    const shuffledQuestions = gameQuestions
        .sort(() => Math.random() - 0.5);
    return shuffledQuestions[0];
}

export const getRandomQuestion = () => {
    const shuffledQuestions = [ ...questionList]
        .sort(() => Math.random() - 0.5);
    return shuffledQuestions[0];
}

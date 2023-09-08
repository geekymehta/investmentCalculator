import { useState } from "react";
import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";

function App() {
  const [results, setResults] = useState(null); //alternate way
  //const [yearlyData, setYearlyData] = useState(); 
  //const [userInput, setUserInput] = useState(null)
  let x = null;

  const calculateHandler = (userInput) => {    
    const yearlyData = [];
    if(userInput){
      x = userInput["current-savings"];
      let currentSavings = +userInput["current-savings"]; // feel free to change the shape of this input object!
      const yearlyContribution = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
      const expectedReturn = +userInput["expected-return"] / 100;
      const duration = +userInput["duration"];
      
      for (let i = 0; i < duration; i++) {
        const yearlyInterest = currentSavings * expectedReturn;
        currentSavings += yearlyInterest + yearlyContribution;
        yearlyData.push({
          year: i + 1,
          yearlyInterest: yearlyInterest,
          savingsEndOfYear: currentSavings,
          yearlyContribution: yearlyContribution
        });
      }
    }  
    setResults(yearlyData);
    };

    const resetHandler = () => {
      setResults(null);
    };

  return (
    <div>

      <Header />

      <UserInput onCalculate={calculateHandler} onReset = {resetHandler}/>

      {!results && <p>No Input Yet.</p>}
      {results && <ResultsTable data = {results} initialInvestment = {x}/>}

    </div>
  );
}

export default App;

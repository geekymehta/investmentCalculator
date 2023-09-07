import { useState } from "react";
import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";

function App() {
  const [results, setResults] = usestate(null); 
  const calculateHandler = (userInput) => {
    const yearlyData = [];
    if(userInput){
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

  return (
    <div>

      <Header />

      <UserInput onCalculate={calculateHandler} />

      <ResultsTable data = {yearlyData}/>

    </div>
  );
}

export default App;

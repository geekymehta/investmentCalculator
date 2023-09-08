import { useState } from "react";
import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";

function App() {
  //const [results, setResults] = useState(null); 
  //const [yearlyData, setYearlyData] = useState(); 
  const [userInput, setUserInput] = useState(null)
  let x = null;

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

    
    
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

  return (
    <div>

      <Header />

      <UserInput onCalculate={calculateHandler} />

      {!userInput && <p style = {{textAlign : 'center'}}>No Input Yet.</p>}
      {userInput && <ResultsTable data = {yearlyData} initialInvestment = {userInput["currentSavings"]}/>}

    </div>
  );
}

export default App;

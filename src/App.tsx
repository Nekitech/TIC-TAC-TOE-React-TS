import React from 'react';
import './App.css';
import Frame from "./components/frame/Frame";
import WinnerLabel from "./UI/winnerLabel/WinnerLabel";

function App() {
    const [winner, setWinner] = React.useState('');
    const getWinner = (winner: string) => {
        setWinner(winner);
    }

  return (
    <div className="App">
        <WinnerLabel winner={winner}/>
        <Frame getWinner={getWinner}/>

    </div>
  );
}

export default App;

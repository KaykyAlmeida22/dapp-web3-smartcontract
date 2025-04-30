import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import ABI from './abi.json';

function App() {

  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");

  
  }

  

  function onSearchClick(){
    setMessage("");
    console.log("Customer ID: ", customerId);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <label>
            Customer ID:
            <input type="number" value={customerId}  onChange={(evt) => setCustomerId(evt.target.value)}/>
          </label>
          <input type="button" value="Search" onClick={onSearchClick}/>
        </p>
        <p>
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;

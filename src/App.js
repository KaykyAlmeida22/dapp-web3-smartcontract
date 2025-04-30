import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import ABI from './abi.json';

function App() {

  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");

  const CONTRACT_ADRESS = "0xE9956c971B72aD74F249E616828df613F03E858b";
  
  async function doSearch(){
    if(window.ethereum) return setMessage("Please install MetaMask");
    // Check if MetaMask is installed
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Request account access if needed

    const accounts = await provider.send("eth_requestAccounts", []);
    // Get the user's account address
    if(!accounts || !accounts.length) return setMessage("Please connect to MetaMask");
    // If the user is not connected to MetaMask, show an error message

    
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

import { ethers } from 'ethers';
import './App.css';
import { useState } from 'react';
import ABI from './abi.json';

function App() {

  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const CONTRACT_ADRESS = "0xE9956c971B72aD74F249E616828df613F03E858b";

  async function getProvider(){
    if(!window.ethereum) return setMessage("Please install MetaMask");
    // Check if MetaMask is installed
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Request account access if needed
    const accounts = await provider.send("eth_requestAccounts", []);
    // Get the user's account address
    if(!accounts || !accounts.length) return setMessage("Please connect to MetaMask");
    // If the user is not connected to MetaMask, show an error message
    return provider;
  }
  
  async function doSearch(){

    try {
      const provider = await getProvider();
      // Get the provider
      const contract = new ethers.Contract(CONTRACT_ADRESS, ABI, provider);
      // Create a new contract instance
      const customer = await contract.getCustomer(customerId);
      // Call the getCustomer function on the contract
      setMessage(JSON.stringify(customer));
      // Set the message to the customer data
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  }

  

  function onSearchClick(){
    setMessage("");
    doSearch();
  }

  async function doSave(){


    try {
      const provider = await getProvider();
     // Get the provider
     const signer = provider.getSigner();
     // sign the transaction

      const contract = new ethers.Contract(CONTRACT_ADRESS, ABI, provider);
      // Create a new contract instance
      const contractSigner = contract.connect(signer);
      // Connect the contract to the signer

      const tx = await contractSigner.addCustomer({name, age});
      // Call the addCustomer function on the contract
      setMessage(JSON.stringify(tx));
      
    } catch (error) {
      setMessage("Error: " + error.message);
      
    }

  }

  function onSaveClick(){
    setMessage("");
    doSave();
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
        <hr/>
        <p>
          <label>
            Name: <input type="text" value={name} onChange={(evt) => setName(evt.target.value)}/>
          </label> 
          <label>
            Age: <input type="number" value={age} onChange={(evt) => setAge(evt.target.value)}/>
          </label>
          <input type="button" value="Save" onClick={onSaveClick}/>
        </p> 
        <p>
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;

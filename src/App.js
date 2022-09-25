import './App.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = "0xd146e1dEfD9F4696cD6fc6fa0151277919D2c18f"

function App() {
  const [greeting, setGreetingValue] = useState()
  const [onchain_greeting, set_onchain_greeting] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        set_onchain_greeting(data);
      } catch (err) {
        console.log('error: ', err)
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id="current_greeting">{onchain_greeting}</div>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set Greeting" />
      </header>
    </div>
  )
}

export default App;
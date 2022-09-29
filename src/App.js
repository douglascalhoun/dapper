import './App.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'

const greeterAddress = "0xd146e1dEfD9F4696cD6fc6fa0151277919D2c18f"
const tokenAddress = "0xA4aC3DabeFd9fB0605Aecd82EBb174Db541Aa7Fe"

function App() {
  const [greeting, setGreetingValue] = useState()
  const [onchain_greeting, set_onchain_greeting] = useState()

  const [current_balance, set_current_balance] = useState()
  const [destination_account, set_destination_account] = useState()
  const [token_amount, set_token_amount] = useState()
  const [notice, set_notice] = useState()


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

  async function get_balance(){
    if (typeof window.ethereum !== 'undefined') {
      const [user_address] = await window.ethereum.request({ method: 'eth_requestAccounts'})
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(user_address)
      set_current_balance(balance.toString())
    }
  }

  async function send_tokens(){
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const token_contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      const transaction = await token_contract.transfer(destination_account, token_amount)
      await transaction.wait()
      set_notice(`${token_amount} transfered to ${destination_account}`)
      
      get_balance()
    }
  }

  get_balance()

  return (
    <div className="App">
      <div>
        <div id="current_greeting">{onchain_greeting}</div>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set Greeting" />
      </div>
      <div>
        <div>Current Balance is: {current_balance}</div>
        <input onChange={e => set_destination_account(e.target.value)} placeholder="send to:" />
        <input onChange={e => set_token_amount(e.target.value)} placeholder="amount" />
        <button onClick={send_tokens}> Send</button>
        <div>{notice}</div>
      </div>
    </div>
  )
}

export default App;
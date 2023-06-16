import { connectToServer } from './socket.client'
import viteLogo from '/vite.svg'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <h2>E-commerce Chat Client</h2>

    <input id="jwt-token" placeholder="JSON Web Token" />
    <button id="btn-connect">Connect</button>
    <br/>

    <span id="server-status">Offline</span>

    <ul id="clients-id"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="message-ul"></ul>
  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if(jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT');

  connectToServer(jwtToken.value.trim())
})
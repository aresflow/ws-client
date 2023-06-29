import { connectToServer } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input placeholder="Json Web Token" type="text" id="jwt-token" />
    <button id="btn-connect">Connect</button>

    <br/>
    <span id="server-status">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
        <input placeholder="message" type="text" id="message-input" />
        <button type="submit">Send</button>
    </form>

    <h3>Messages: </h3>
    <ul id="messages-ul"></ul>

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

  if (jwtToken.value.trim().length <= 0) return alert('Please enter a valid Json Web Token');

  connectToServer(jwtToken.value.trim());
})
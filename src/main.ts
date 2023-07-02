import { connectToServer } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="chat-box">
  <div class="header">
    <h2>Websocket - Client</h2>
  </div>

  <div class="input-section">
    <input placeholder="Json Web Token" type="text" id="jwt-token" />
    <button id="btn-connect">Connect</button>
  </div>

  <div class="status">
    <span id="server-status">Offline</span>
  </div>

  <div class="client-list">
    <ul id="clients-ul"></ul>
  </div>

  <div class="message-form">
    <form id="message-form">
      <input placeholder="Message" type="text" id="message-input" />
      <button type="submit">Send</button>
    </form>
  </div>

  <div class="message-section">
    <h3>Messages:</h3>
    <ul id="messages-ul"></ul>
  </div>
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
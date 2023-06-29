import { Manager } from "socket.io-client"
import { Socket } from "socket.io-client";

export const connectToServer = (token: string) => {

    const manager = new Manager('localhost:4000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    }); //CON ESTO SE CONECTA AL SERVIDOR
    const socket = manager.socket('/'); //CON ESTO SE CONECTA AL NAMESPACE RAIZ

    addListeners(socket);
}

const addListeners = (socket: Socket) => { //ESTE METODO SE ENCARGA DE ESCUCHAR LOS EVENTOS DEL SERVIDOR Y ACTUALIZAR EL DOM
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.textContent = 'Online';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.textContent = 'Offline';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`
        });
        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => { //ESTE EVENTO SE ENCARGA DE ENVIAR EL MENSAJE AL SERVIDOR
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client', {
            id: 'yo!!', 
            message: messageInput.value
        });

        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string}) => { //ESTE EVENTO SE ENCARGA DE RECIBIR EL MENSAJE DEL SERVIDOR
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>`;

            const li = document.createElement('li');
            li.innerHTML = newMessage;
            messagesUl.append(li);
    });
}
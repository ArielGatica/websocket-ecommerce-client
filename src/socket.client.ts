import { Manager, Socket } from 'socket.io-client'

let socket: Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: token
    }  
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');
  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  const serverStatusLevel = document.querySelector('#server-status')!;
  const clientsId = document.querySelector('#clients-id')!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#message-ul')!;
  
  socket.on('connect', () => { 
    serverStatusLevel.innerHTML = 'Connected'
  })

  socket.on('disconnect', () => { 
    serverStatusLevel.innerHTML = 'Disconnected'
  })
  
  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = ''
    clients.map(clientId => {
      clientsHtml += `<li>${ clientId }</li>`
    })

    clientsId.innerHTML = clientsHtml
  })

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(messageInput.value.trim().length <= 0) return
    
    socket.emit('message-from-client', {
      id: 'Me!', 
      message: messageInput.value
    })
    messageInput.value = ''
  })

  socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
    const newMessage = `
      <li>
        <strong>${ payload.fullName }</strong>
        <span>${ payload.message }</span>
      </li>
    `
    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);
  })
}
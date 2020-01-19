let socket = io('http://localhost:3000')
let messageContainer = $('#message-container')
let roomContainer = $('#room-container')
let messageForm = $('#send-container')
let messageInput = $('#message-input')

console.log('messageForm',messageForm);

if (messageForm.val() != null) {
  const name = prompt('What is your name?')
  messageContainer.append("<div> You joined </div>")
  socket.emit('new-user', roomName, name)

  messageForm.submit(e => {
    if(messageInput.val() != ''){
      e.preventDefault()
      const message = messageInput.val()
      appendMessage(`You: ${message}`)
      socket.emit('send-chat-message', roomName, message)
      messageInput.val('')
      // messageInput.focus();
    }
  })
}

socket.on('room-created', room => {
  roomContainer.append('<div>' + room + '</div><a href=/' + room + '>Join</a>')
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
  messageContainer.append('<div>' + message + '</div>')
}

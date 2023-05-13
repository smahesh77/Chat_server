const socket = io()
const chatmsgs = document.querySelector('.chat-messages')
const chatForm = document.getElementById('chat-form')

//get username and room from url
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinroom', { username, room})

//message from server
socket.on('msg', message => {
    //console.log("got it")
    console.log(message)
    outputmsg(message);

    //scroll down
    chatmsgs.scrollTop = chatmsgs.scrollHeight

})

chatForm.addEventListener('submit', e => {
    e.preventDefault();// to stop it from defaultly saving the form
    //getting message text
    const msg = e.target.elements.msg.value// to get vaue from that textfield
    
    //sending the message back to server
    socket.emit('chatMsg',msg)

    //clear input
    e.target.elements.msg.value =""
    e.target.elements.msg.focus()

})

//output message to DOM
function outputmsg(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}
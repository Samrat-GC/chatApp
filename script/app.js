let chatRoom = document.querySelector('.chat-rooms');
const chat = document.querySelector('.new-chat');
const user = document.querySelector('.new-name');
const chatWindow = document.querySelector('.chat-window .chat-list');
const update_name = document.querySelector('.update_name');
let activeChatRoom = 'general';
import Chatroom from './chat.js';
import DisplayChat from './display.js';



// Check for the saved username in localstorage if any
const username = localStorage.username ? localStorage.username : 'user';

// Listen for the room user click on and display the chat according to activeChatRoom
chatRoom.addEventListener('click', e => {
    if(e.target.id){
				activeChatRoom = e.target.id;
				display.wipe();
        newStuff.updateRoom(activeChatRoom);
				newStuff.getChats(data => display.display(data));
				// setTimeout(()=>chatWindow.lastElementChild.scrollIntoView(),300)
				

    }
})

// if user updates name listen for it and change the username in ChatRoom class 
user.addEventListener('submit', (e) => {
    e.preventDefault();
    userName = user.name.value.trim();
    newStuff.updateName(userName);
    update_name.textContent = `Your name has been updated to ${userName}`;
    setTimeout(()=>{
        update_name.textContent = null;
    }, 3000);

});

// post the added chat in database
chat.addEventListener('submit', e => {
    if(chat.message.value){
    e.preventDefault();
    newStuff.addChat(chat.message.value);
    
}
})

// create new instance of DisplayChat giving it the argument of ul 
const display = new DisplayChat(chatWindow);

// create new instance of Chatroom and default the room to general. Username depends on weather there is pre-defined usename in local storage or not.
const newStuff = new Chatroom('general', username);

// Get all the chats and actively listen to any kind of changes from the database
newStuff.getChats(data => display.display(data));




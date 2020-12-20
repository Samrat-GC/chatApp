class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
				this.unsub;
				// this.chatlist = chatlist;
    }
    async addChat(message){
        // format a chat object
        const now = new Date();
        const chat = {
            created_at: firebase.firestore.Timestamp.fromDate(now),
            message, 
            username: this.username,
            room: this.room
				};
				
				// this.chats.doc().set(chat);
        // save the chat documents
        const response = await this.chats.add(chat);
        return response;

    }
    async getChats(callback){
         this.unsub = await this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        // update the UI
                        callback(change.doc);

                    }else if(change.type === 'removed'){
                        
                    }
								})

				})
			};
						
  
    updateName(username){
				this.username = username;
				localStorage.setItem('username', username);
    }
    updateRoom(room){
				this.room = room;
				this.unsub();
    }
}

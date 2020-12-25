import { formatDistanceToNow } from 'date-fns';

export default class DisplayChat{
    constructor(list){
        this.list = list;
    }

		wipe(){
			this.list.innerHTML = '';
		}
    display(data){
				const fns = formatDistanceToNow(data.created_at.toDate(), {addSuffix: true})
        const html = `
        <li class="list-group-item">
            <span class="username bold">${data.username}:</span>
            <span class="message">${data.message}</span>
            <div class="time"><small>${fns}</small></div>
				</li>
				`;

				this.list.innerHTML += html;
				if(document.querySelector('.chat-list')){
					document.querySelector('.chat-list').lastElementChild.scrollIntoView();
				}
    }
} 
import React, {Component} from 'react';


class MessageList extends Component {





render(){



let myMessages = this.props.messages.map((message, index) => {
        return(
            <ul className="message-list">
                
                <li key={message.id} className="message">
                <div>
                    {message.senderId}
                    </div>
                
                <div>
                    {message.text}
                </div>
                </li>
            </ul>
        )
    })
    return(
        <div>
       
            {myMessages}
            
        </div>
    )
}
}






export default MessageList;
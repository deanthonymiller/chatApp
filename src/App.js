import React, { Component } from 'react';
import MessageList from './components/MessageList/MessageList'
import Title from './components/Title/Title'
import SendMessageForm from './components/SendMessageForm/SendMessageForm';// import logo from './logo.svg';
import './App.css';
import { ChatManager, TokenProvider } from '@pusher/chatkit'


const instanceLocator = "v1:us1:8818034a-ba80-470e-a0c7-4dedf5f1d74b";

const testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8818034a-ba80-470e-a0c7-4dedf5f1d74b/token';

const username = 'perborgen';

const roomId =  19372376;


// const DUMMY_DATA = [
//   {
//   senderId: "perborgen",
//   text: "who'll win?"
//   },
//       {
//   senderId: "janedoe",
//   text: "who'll win?"
//   }
// ]
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      messages:[]
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator: instanceLocator,
      userId: 'janedoe',
      tokenProvider: new TokenProvider({
          url: testToken
      })
  })
    
    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
     })
    })
  }

    sendMessage = (text) =>{
      this.currentUser.sendMessage({
        text,
        roomId: roomId
      })
    }
  

  render() {
    return (
      <div className="app">
      <Title />
      <MessageList 
      roomId={this.state.roomId}
      messages={this.state.messages} />
      <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;

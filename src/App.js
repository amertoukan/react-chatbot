import React, { Component } from 'react';
import {ChatBot, Interactions} from 'aws-amplify-react';
import {ChatFeed, Message} from 'react-chat-ui';
import './App.css';

 const handleComplete = (err, confirmation) => {
  if(err){
    alert('Bot conversation failed :(')
  }
    alert ('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Reservation booked. Thank you! What would you like to do next?';
}

class App extends Component {
  render() {
this.state = {
  input : '',
  finalMessage : '',
  messages: [
    new Message({
      id:1,
      message:"Book a flight or a car!",
    })
  ],
}

const onChange = (e) => {
  const input = e.target.value
  this.setState({
    input
  })
}


const _handleKeyPress = (e) => {
  if(e.key === 'Enter'){
    this.submitMessage()
  }
}

const submitMessage = async() => {
  const {input} = this.stateif (input === '') 
  const message = new Message ({
    id:0,
    message: input,
  })
  let messages = [...this.state.messages, message]

  this.setState ({
    messages, input: ''
  })

  const response = await Interactions.send ('BookTripMOBILEHUB', input);
  const responseMessage = new Message ({
    id:1, 
    message : response.message
  })

  messages = [...this.state.messages,responseMessage]
  this.setState ({messages})

  if (response.dialogState === 'Fulfilled') {
    if (response.intentName === 'BookTripBookHotel') {
      const { slots: { BookTripCheckInDate, BookTripLocation, BookTripNights, BookTripRoomType } } = response
      const finalMessage = `Congratulations! Your trip to ${BookTripLocation}  with a ${BookTripRoomType} rooom on ${BookTripCheckInDate} for ${BookTripNights} days has been booked!!`
      this.setState({ finalMessage })
    }
  }
}

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: 'white',
    fontSize: 22
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    padding: 20,
    borderTop: '12px solid rgb(204, 204, 204)'
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: 'none',
    width: 350,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}

return (
  <div className="App">
  <header style={styles.header}>
  <p style={styles.headerTitle}>Welcome to my travel bot!</p>
</header>
<div style={styles.messagesContainer}>
<h2>{this.state.finalMessage}</h2>
<ChatFeed
  messages={this.state.messages}
  hasInputField={false}
  bubbleStyles={styles.bubbleStyles}
/>
<input
  onKeyPress={this._handleKeyPress}
  onChange={this.onChange}
  style={styles.input}
  value={this.state.input}
/>
<ChatBot 
    title = "My React Bot"
    botName = "BookTripMOBILEHUB"
    welcomeMessage = "Would you like to book a car or hotel?"
    onComplete = {handleComplete}
    clearOnComplete = {true}
/>
      </div>
</div>
)

}
}
 

export default App;

import React, { Component } from 'react';
import {ChatBot} from 'aws-amplify-react';
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



return (
  <div className="App">
  
  <ChatBot 
    title = "My React Bot"
    botName = "BookTripMOBILEHUB"
    welcomeMessage = "Welcome, how can I help you today?"
    onComplete = {handleComplete}
    clearOnComplete = {true}
/>
      </div>
    );
  }
}

export default App;

import logo from './logo.svg';
import './App.css';
import { getGroupedEvents } from './googleCalendareService.js'
import React, { Component }  from 'react';

let events;

function finalEvents() {

  if(!events) {
    events = getGroupedEvents().then((result) => {
      console.log('Вот сейчас мы получили данные' + JSON.stringify(result));
      return result
    });
  } 
  console.log('А сейчас нихрена нет! ' + JSON.stringify(events)); // И вот сейчас 1:30 ночи и я спать пошел, потом разбирусь с этой ассинхронщиной!
  return events;
}

function App() {
  const eventsToDisplay = JSON.stringify(finalEvents());
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <div>
        {eventsToDisplay}
      </div>
    </div>
  );
}

export default App;

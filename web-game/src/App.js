import Arena from './components/Arena.js'

import socketIOClient from "socket.io-client";
import React, {useRef, useEffect} from 'react';
import './App.css';


const WS_ADDR = 'http://localhost:8080'

function App() {
  // const socket = socketIOClient(WS_ADDR)

  return (
    <Arena></Arena>
  );
}

export default App;

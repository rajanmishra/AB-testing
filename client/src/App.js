import './App.css';

import  { getCookie, setCookie }  from './helper'

import { useEffect, useState } from 'react'

const App = () => {
  const [layout, setLayout] = useState();
  
  const [identifier, setIdentifier] = useState();

  useEffect(() => {
    const getIdentifier = () => {
      let userID = getCookie('userID');
      console.log(userID, 'from cookies');
      if (!userID) {
        userID = Date.now();
      }
      setCookie('userID', userID, 30);
      setIdentifier(userID);
    };
    getIdentifier();
  }, []);

  useEffect(() => {
    const getTemplate = async () => {
      if (!identifier) return;

      console.log(identifier);
      let response = await fetch('http://localhost:3004/getLayout', {
        method: 'POST',
        body: JSON.stringify({ userIdentifier: identifier }),
        headers: { 'content-type': 'application/json' },
      });
      let result = await response.json();
      console.log(result);
      setLayout(result.templateId);
    };
    getTemplate();
  }, [identifier]);


  return (
    <div className="container">
     <h4>Welcome</h4>
     You are viewing layout {layout}
    </div>
  );
}

export default App;

import "./App.css";
import { useEffect, useState } from "react";
import firebase from "./firebase";
import axios from "axios";

function App() {
  const [symbol, setSymbol] = useState('');
  const db = {
        tsla: {
          price: 450,
          share: 5,
        }
      }
   useEffect(() => {
     const dbRef = firebase.database().ref();
     dbRef.on("value", (response) => {
       const myData = response.val()
         for (const stockSymbol in myData) {
        const stock = {
          symbol: stockSymbol,
          price: myData[stockSymbol],
          share:myData[stockSymbol]
        };
      }
     });
   }, []);

  useEffect(() => {
    const key = "JCWSLD5KCL4HGL0Q";
    axios({
      url: "https://www.alphavantage.co/query",
      method: "GET",
      params: {
        function: "TIME_SERIES_DAILY",
        symbol: "tsla",
        apikey: key,
      },
    }).then((res) => {
      console.log(res.data);
    });
  }, []);

  const addData = (event) =>{
       event.preventDefault();
       const dbRef = firebase.database().ref();
       dbRef.push(symbol);
  }
  return (
    <div className="App">
      <header>
        <h1>Stock Watchlist</h1>
      </header>
      <main>
        <form action="GET">
          <input type="text" />
          <input type="number" />
          <input type="number" />
          <button onClick={addData}>+</button>
        </form>
      </main>
    </div>
  );
}

export default App;

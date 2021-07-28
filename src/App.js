import "./App.css";
import { useEffect, useState } from "react";
import firebase from "./firebase";
import axios from "axios";
import Input from "./Input";
import Stocks from "./Stocks";
import Calculation from "./Calculation";

function App() {
  const [stockList, setStockList] = useState([]);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const myData = response.val();

      const newArray = [];

      for (const stocks in myData) {
        const stock = {
          key: stocks,
          symbol: myData[stocks].symbol,
          price: myData[stocks].price,
          share: myData[stocks].share,
        };
        newArray.push(stock);
      }
      setStockList(newArray);
    });
  }, []);



  return (
    <div className="App">
      <header>
        <h1>Stock Watchlist📈📈📈</h1>
        <Input stockList={stockList} />
      </header>

      <main>
        <div className="tables wrapper">
          <Stocks stockList={stockList} />

          <Calculation stockList={stockList} />
        </div>
      </main>

      <footer>
        Created at
        <span>
          <a href="https://junocollege.com/"> Juno College</a>
        </span>
        , powered by <a href="https://www.alphavantage.co/">alphavantage</a>
      </footer>
    </div>
  );
}

export default App;

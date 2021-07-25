import "./App.css";
import { useEffect, useState } from "react";
import firebase from "./firebase";
import axios from "axios";

function App() {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [share, setShare] = useState("");
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const myData = response.val();
      console.log(myData);
      const newArray = [];
      const key = "JCWSLD5KCL4HGL0Q";
      for (const stocks in myData) {
        const stock = {
          key: stocks,
          symbol: myData[stocks].symbol,
          price: myData[stocks].price,
          share: myData[stocks].share,
        };
        console.log(stock);
        newArray.push(stock);
        axios({
          url: "https://www.alphavantage.co/query",
          method: "GET",
          params: {
            function: "TIME_SERIES_DAILY",
            symbol: stock.symbol,
            apikey: key,
          },
        }).then((res) => {
          console.log(res.data);
          const inputPrice = stock.price;
          const todayPrice =
            res.data["Time Series (Daily)"]["2021-07-23"]["4. close"];
          const profitPerShare = todayPrice - inputPrice;
          const profitPerStock = profitPerShare * stock.share
          console.log(profitPerStock);
        }).catch((error)=>{
          alert(error,'Please enter correct information or wait for another minute.')
        })
      }
      setStockList(newArray);
      console.log(stockList);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    const newStock = dbRef.push();
    newStock.set({
      symbol,
      price,
      share,
    });

    setSymbol("");
    setPrice("");
    setShare("");
  };

  const handleDelete = (item) => {
    const dbRef = firebase.database().ref();
    dbRef.child(item).remove();
  };

  return (
    <div className="App">
      <header>
        <h1>Stock Watchlist</h1>
      </header>
      <main>
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            id="stockInput"
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value);
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
          />
          <input
            type="text"
            onChange={(e) => {
              setShare(e.target.value);
            }}
            value={share}
          />
          <button type="submit">+</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Share</th>
            </tr>
          </thead>
          {stockList.map((stockObject) => {
            return (
              <tbody key={stockObject.key}>
                <tr>
                  <td>{stockObject.symbol}</td>
                  <td>{stockObject.price}</td>
                  <td>{stockObject.share}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(stockObject.key);
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </main>
    </div>
  );
}

export default App;

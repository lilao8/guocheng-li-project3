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

      for (const stocks in myData) {
        const stock = {
          key: stocks,
          symbol: myData[stocks].symbol,
          price: myData[stocks].price,
          share: myData[stocks].share,
        };
        console.log(stock);
        newArray.push(stock);
      }
      setStockList(newArray);
    });
  }, []);

  // useEffect(() => {
  //   const key = "JCWSLD5KCL4HGL0Q";
  //   axios({
  //     url: "https://www.alphavantage.co/query",
  //     method: "GET",
  //     params: {
  //       function: "TIME_SERIES_DAILY",
  //       symbol: "tsla",
  //       apikey: key,
  //     },
  //   }).then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

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
                      }}>-</button>
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

import "./App.css";
import { useEffect, useState } from "react";
import firebase from "./firebase";
import axios from "axios";

function App() {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [share, setShare] = useState("");
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

  const handleCal = (event) => {
    event.preventDefault();
    const newArray = [];
    const key = "JCWSLD5KCL4HGL0Q";
    let totalProfit = 0;

    stockList.map((stockObj) => {
      axios({
        url: "https://www.alphavantage.co/query",
        method: "GET",
        params: {
          function: "TIME_SERIES_DAILY",
          symbol: stockObj.symbol,
          apikey: key,
        },
      })
        .then((res) => {
          const inputPrice = stockObj.price;
          const todayPrice =
            res.data["Time Series (Daily)"]["2021-07-23"]["4. close"];
          const profitPerStock =
            (Math.round(todayPrice - inputPrice) * stockObj.share * 100) / 100;
          totalProfit += profitPerStock;
          const profit = { profit: profitPerStock, total: totalProfit };
          const stock1 = { ...stockObj, ...profit };
          newArray.push(stock1);
          console.log(stock1);
        })
        .catch((error) => {
          console.log(
            error,
            "Please enter correct information or wait for another minute."
          );
        });
      setNewList(newArray);
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Stock Watchlist📈📈📈</h1>
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
          <button>+</button>
        </form>
      </header>

      <main>
        <div className="tables wrapper">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {stockList.map((stockObject) => {
                return (
                  <tr key={stockObject.key}>
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
                );
              })}
            </tbody>
          </table>
          <table>
            <tbody>
              <th>Profit</th>
              {newList.map((profitObject) => {
                return (
                  <tr key={profitObject.key}>
                    <td>{profitObject.profit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button className = "submit"onClick={handleCal}>Calculate</button>
      </main>
    </div>
  );
}

export default App;

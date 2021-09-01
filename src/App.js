import "./App.css";
import {useEffect, useState} from "react";
import firebase from "./firebase";
import Input from "./Input";
import Stocks from "./Stocks";
import Calculation from "./Calculation";
import axios from "axios";


function App() {
    const [stockList, setStockList] = useState([]);
    const [newList, setNewList] = useState([]);
    let totalProfit = 0;



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

    const handleCalculate = (event) => {
        event.preventDefault();
        const newArray = [];
        const key = "JCWSLD5KCL4HGL0Q";
        stockList.map((stockObj) => {
            const promiseObj = axios({
                url: "https://www.alphavantage.co/query",
                method: "GET",
                params: {
                    function: "TIME_SERIES_DAILY",
                    symbol: stockObj.symbol,
                    apikey: key,
                },
            });
            newArray.push(promiseObj);
            return newArray;
        });

        Promise.all(newArray)
            .then((res) => {
                const profitArray = [];

                res.forEach((obj) => {
                    stockList.forEach((stockObj) => {
                        if (stockObj.symbol === obj.data["Meta Data"]["2. Symbol"]) {
                            const inputPrice = stockObj.price;
                            const todayPrice =
                                obj.data["Time Series (Daily)"]["2021-07-23"]["4. close"];
                            const profitPerStock =
                                (Math.round(todayPrice - inputPrice) * stockObj.share * 100) /
                                100;
                            totalProfit += profitPerStock;
                            const profit = {profit: profitPerStock, total: totalProfit , key:stockObj.symbol};
                            const stock1 = {...profit};
                            profitArray.push(stock1);
                            console.log(stock1)
                        }
                    });
                });
                setNewList(profitArray);
                console.log(profitArray)

            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <div className="App">
            <header>
                <h1>Stock Watchlist📈📈📈</h1>
                <Input stockList={stockList}/>
                <h2>Rule 1: No more than 5 stocks each time.</h2>
                <h2>Rule 2: Do not try more than 5 times per minute.</h2>
                <p className="hide">Data from 2021-07-23</p>
                <button className="submit" onClick={handleCalculate}>
                    Calculate
                </button>
            </header>

            <main>

                <div className="tables wrapper">
                    <Stocks stockList={stockList}/>
                    <Calculation newList={newList} />
                </div>
            </main>

            <footer>
                Created at
                <a href="https://junocollege.com/"> Juno College</a>, powered by{" "}
                <a href="https://www.alphavantage.co/">Alphavantage</a>
            </footer>
        </div>
    );
}

export default App;

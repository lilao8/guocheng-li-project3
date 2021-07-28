import { useState } from "react";
import axios from "axios";

const Calculation = (props) => {
  const { stockList } = props;
  const [newList, setNewList] = useState([]);
  let totalProfit = 0;

  const handleCalculate = (e) => {
    e.preventDefault();
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
              const profit = { profit: profitPerStock, total: totalProfit };
              const stock1 = { ...stockObj, ...profit };
              profitArray.push(stock1);
            }
          });
        });
        setNewList(profitArray);
      })
      .catch((error) => {
        console.log(
          error,
          "Please enter correct information or wait for another minute."
        );
      });
  };

  return (
    <>
      <table className="calculation">
        <thead>
          <tr>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {newList.map((profitObject) => {
              
              return <td key={profitObject.key}>{profitObject.profit}</td>;
            })}
          </tr>
        </tbody>
      </table>
      <button className="submit" onClick={handleCalculate}>
        Calculate
      </button>
    </>
  );
};

export default Calculation;

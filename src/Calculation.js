import { useEffect, useState } from "react";
import axios from "axios";
const Calculation = (props) => {
  const { stockList } = props;
  const [newList, setNewList] = useState([]);
  const newArray = [];
  const handleCalculate = (e) => {
    e.preventDefault();

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
          setNewList(newArray);
            console.log(newArray);
        })
        .catch((error) => {
            console.log(
              error,
              "Please enter correct information or wait for another minute."
            );
        });
    });
    
  };

  return (
    <>
      <table className="calculation">
        <thead>
          <tr>
            <th>Profit</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {newList.map((profitObject) => {
            return (
              <tr key={profitObject.key}>
                <td>{profitObject.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="submit" onClick={handleCalculate}>
        Calculate
      </button>
    </>
  );
};

export default Calculation;

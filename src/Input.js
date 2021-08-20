import { useState } from "react";
import firebase from "./firebase";

const Input = () => {
  //   const { stockList } = props;
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [share, setShare] = useState("");

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

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <label htmlFor="stockInput">
        Please enter your stock symbol, price and share you bought.
      </label>
      <input
        type="text"
        id="stockInput"
        value={symbol}
        placeholder="Symbol"
        onChange={(e) => {
          setSymbol(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />
      <input
        type="number"
        placeholder="Share"
        onChange={(e) => {
          setShare(e.target.value);
        }}
        value={share}
      />
      <button>Add to the list</button>
    </form>
  );
};

export default Input;

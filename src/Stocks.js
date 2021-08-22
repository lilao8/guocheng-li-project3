import firebase from "firebase";

const Stocks = (props) => {
  const { stockList } = props;

  const handleDelete = (item) => {
    const dbRef = firebase.database().ref();
    dbRef.child(item).remove();
  };

  return (
    <div className="big">
      <div className="mid">
        <ul>
          <li>Symbol</li>
          <li>Price</li>
          <li>Share</li>
          <li>+/-</li>
        </ul>
      </div>
      <div className="mid">
        {stockList.map((stockObject) => {
          return (
            <ul key={stockObject.key}>
              <li>{stockObject.symbol}</li>
              <li>{stockObject.price}</li>
              <li>{stockObject.share}</li>
              <li>
                <button
                  className="delete"
                  onClick={() => {
                    handleDelete(stockObject.key);
                  }}
                >
                  🗑
                </button>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Stocks;

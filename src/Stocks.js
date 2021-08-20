import firebase from "firebase";

const Stocks = (props) => {
  const { stockList } = props;

  const handleDelete = (item) => {
    const dbRef = firebase.database().ref();
    dbRef.child(item).remove();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Share</th>
          <th>+/-</th>
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
  );
};

export default Stocks;

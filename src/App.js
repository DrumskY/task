import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchPharse, setSearchPharse] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch("https://reqres.in/api/products?per_page=5&page=" + pageNumber)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          setTotalPages(result.total_pages);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [pageNumber]);

  const click = (number) => {
    if (pageNumber + number > 0 && pageNumber + number <= totalPages) {
      setPageNumber(pageNumber + number);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const filteredItems = searchPharse
    ? items.filter((item) => item.id === +searchPharse)
    : items;

  return (
    <div className="App">
      <div className="inputDivNumber">
        <input
          type="number"
          placeholder="Search:"
          className="inputNumber"
          min="1"
          max={items.length}
          onChange={(e) => {
            setSearchPharse(e.target.value);
          }}
          value={searchPharse}
        />
      </div>

      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <div
            className="item"
            style={{ backgroundColor: item.color }}
            key={item.id}
          >
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.year}</p>
          </div>
        ))
      ) : (
        <p className="errorMessage">No items</p>
      )}
      <div className="buttons">
        <button className="buttonNavigation" onClick={() => click(-1)}>
          Prev
        </button>
        <button className="buttonNavigation" onClick={() => click(1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

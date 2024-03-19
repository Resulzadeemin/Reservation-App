import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import RestaurantData from "../RestaurantData/RestaurantData";
import { Link } from "react-router-dom";
import "./Restaurant.css";
import CircularProgress from "@mui/material/CircularProgress";

function Restaurant() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState([]);
  const [load, SetLoad] = useState(12);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setData(response.data);
        setSelect(response.data);
        setLoading(false);
      })
      .catch((error) => alert("error.."));
  }, []);
  const inputHandler = (e) => {
    setSearch(e.target.value);
  };
  const srchRestaurant = () => {
    const results = data.filter((a) =>
      a.title.toLowerCase().startsWith(search.toLowerCase())
    );
    setSelect(results);
    setSearch("");
  };
  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress disableShrink />
      </div>
    );
  }

  return (
    <div className="container res" style={{ textAlign: "center" }}>
      <h1>All Restaurant</h1>
      <input
        placeholder="search.."
        onChange={inputHandler}
        value={search}
        type="text"
      />
      <button onClick={srchRestaurant}>GO</button>
      <div className="restaurant">
        {select.length == 0 ? (
          <div className="srch">
            <h3>axtaris uzre netice yoxdur..</h3>
          </div>
        ) : (
          select.slice(0, load).map((item, index) => {
            return (
              <div key={index}>
                <Link to={`about/${item.id}`}>
                  <RestaurantData {...item} />
                </Link>
              </div>
            );
          })
        )}
      </div>
      <button onClick={() => SetLoad(load + 50)}>Load more 50</button>
    </div>
  );
}

export default Restaurant;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";
import { nanoid } from "nanoid";
import "./RestaurantAbout.css";

const notify = () =>
  toast.success("Reservation ugurlu oldu.", {
    style: {
      border: "1px solid #52C41A",
      padding: "16px",
      fontSize: "25px",
      fontFamily: "Arial",
      color: "#52C41A",
    },
    iconTheme: {
      color: "#52C41A",
      primary: "#52C41A",
      secondary: "#FFFAEE",
    },
  });

function RestaurantAbout() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [state, setState] = useState({
    date: "",
    time: "",
    users: "",
    id: nanoid(),
  });

  const { date, time, users } = state;

  const inputHandle = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();

    fetch("http://localhost:7000/reservation", {
      method: "POST",
      body: JSON.stringify({
        ...state,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    // Toast show
    notify();

    setState({
      date: "",
      time: "",
      users: "",
      id: nanoid(), 
    });
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => alert("error.."));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress disableShrink />
      </div>
    );
  }

  return (
    <div className="container all-res-about">
      <h3>Restaurant About</h3>
      <Link to="/">Return Home</Link>
      {data && (
        <div className="restaurant-about">
          <img src={data.url} alt={data.title} />
          <h2>
            <span style={{ color: "crimson" }}>Restaurant name</span>:{" "}
            {data.title}
          </h2>
        </div>
      )}
      <form onSubmit={submitHandle} action="" method="POST">
        <label>
          Tarix:
          <input
            value={date}
            required
            onChange={inputHandle}
            name="date"
            type="date"
          />
        </label>
        <label>
          Saat:
          <input
            value={time}
            required
            onChange={inputHandle}
            name="time"
            type="time"
          />
        </label>
        <label>
          Sexs Sayi:
          <input
            value={users}
            required
            onChange={inputHandle}
            name="users"
            type="number"
          />
        </label>
        <button type="submit">Reserv et</button>
      </form>

      <Toaster />
    </div>
  );
}

export default RestaurantAbout;

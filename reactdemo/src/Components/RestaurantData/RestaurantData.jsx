import React from "react";
import "./RestaurantData.css"
function RestauranData({ url, title }) {
  return (
    <div className="restaurant-data">
      <img src={url} alt={title} />
      <h2>{title}</h2>
    </div>
  );
}

export default RestauranData;

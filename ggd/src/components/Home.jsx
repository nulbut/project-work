import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/idlecup">이상형월드컵</Link>
        </li>
        <li>
          <Link to="/ShoppingMall">쇼핑몰</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;

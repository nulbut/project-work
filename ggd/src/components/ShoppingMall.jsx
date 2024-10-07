import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const ShoppingMall = () => {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default ShoppingMall;

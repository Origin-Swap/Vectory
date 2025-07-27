import React from "react";
import Topbar from '../components/Menu/TopBar';
import ItemList from "../components/marketplace/ItemList";

const Home = () => {
  return (
    <div className="w-full">
    <div className="md:hidden block">
      <Topbar />
    </div>
      <ItemList />
    </div>
  );
};

export default Home;

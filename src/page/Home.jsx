import React from "react";

import Header from "../components/Header";
import MainSection from "../components/MainSection";
import Footer from "../components/footer/Footer";
import Subscribe from "../components/subscribe/Subscribe";
import Slider from "../components/slider/Slider";
import Searchbar from "../components/searchbar/Searchbar";
import { mostSearch } from "../apis/MostSearch";
const Home = () => {
  return (
    <>
      <Header />
      <MainSection />
      <div className="h-[20vh]    bg-blue-400 flex-col justify-center  items-center	 ">
        <h2 className="heading font-bold text-lg text-center ">
          Calculate Water Footprint of Any Object{" "}
        </h2>
        <search className="flex items-center justify-center mt-3">
          <Searchbar />
        </search>
      </div>
      <Slider data={mostSearch} />

      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;

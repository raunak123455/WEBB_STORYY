import React, { useEffect, useRef } from "react";
import myImage from "../assets/Maskgroup.png";
import myImage1 from "../assets/Maskgroup1.png";
import myImage2 from "../assets/Maskgroup2.png";
import myImage3 from "../assets/Maskgroup4.png";
import myImage4 from "../assets/Maskgroup5.png";
import arrow from "../assets/arrow.jpg";
import larrow from "../assets/larrow.jpg";

import "./Home.css";
import Header from "./Header";
import UserStories from "./Stories";
import { useUser } from "./UserContext";
import FilterStories from "./FilterStories";
import axios from "axios";

const Home = () => {
  const { name, loggedIn, MainCategory, setMainCategory, userId, setUserId } =
    useUser();
  const categoriesRef = useRef(null);

  useEffect(() => {
    const fetchUserIdByName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/by-name/${name}`
        );
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching userId by name", error);
      }
    };

    if (loggedIn) {
      fetchUserIdByName();
    }
  }, [loggedIn]);

  const handleScrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: 150, // Adjust this value as needed for scroll distance
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: -150, // Adjust this value as needed for scroll distance
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="categories-container">
        <div
          className="arrow-container left-arrow-container"
          onClick={handleScrollLeft}
        >
          <img src={larrow} alt="" className="larrow" />
        </div>
        <div ref={categoriesRef} className="categories">
          <div
            className="image-container"
            onClick={() => setMainCategory("all")}
          >
            <img src={myImage} />
            <div className="text-overlay">All</div>
          </div>
          <div
            className="image-container"
            onClick={() => setMainCategory("health and fitness")}
          >
            <img src={myImage1} />
            <div className="text-overlay">Health & fitness</div>
          </div>
          <div
            className="image-container"
            onClick={() => setMainCategory("food")}
          >
            <img src={myImage2} />
            <div className="text-overlay">Food</div>
          </div>
          <div
            className="image-container"
            onClick={() => setMainCategory("Education")}
          >
            <img src={myImage4} />
            <div className="text-overlay">Education</div>
          </div>
          <div
            className="image-container"
            onClick={() => setMainCategory("Travel")}
          >
            <img src={myImage3} />
            <div className="text-overlay">Travel</div>
          </div>
        </div>
        <div
          className="arrow-container right-arrow-container"
          onClick={handleScrollRight}
        >
          <img src={arrow} alt="" className="arrow" />
        </div>
      </div>

      {loggedIn && (
        <div>
          <h2>Your Stories {name}</h2>
          <UserStories username={name} />
        </div>
      )}

      <div>
        {MainCategory == "food" && (
          <div className="categorys">
            <FilterStories MainCategory={MainCategory} />
          </div>
        )}
      </div>

      <div>
        {MainCategory == "health and fitness" && (
          <div className="categorys">
            <FilterStories MainCategory={MainCategory} />
          </div>
        )}
      </div>

      <div>
        {MainCategory == "Education" && (
          <div className="categorys">
            <FilterStories MainCategory={MainCategory} />
          </div>
        )}
      </div>

      <div>
        {MainCategory == "Travel" && (
          <FilterStories MainCategory={MainCategory} />
        )}
      </div>

      {MainCategory === "all" && (
        <div>
          <div className="categorys">
            <FilterStories MainCategory={"food"} />
          </div>
          <div>
            <FilterStories MainCategory={"health and fitness"} />
          </div>
          <div>
            <FilterStories MainCategory={"Education"} />
          </div>
          <div>
            <FilterStories MainCategory={"Travel"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

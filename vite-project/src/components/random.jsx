import React, { useEffect, useState } from "react";
import "./StoryViewer.css"; // Assuming you have a CSS file for styling

const StoryViewer = ({ story, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalSlides = story.length;

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setProgress(0);
    } else {
      setCurrentSlideIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setProgress(0);
    }
  };

  const currentSlide = story[currentSlideIndex];

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     nextSlide();
  //   }, 15000); // 15 seconds

  //   // Clear the timeout if the component is unmounted or when the slide index changes
  //   return () => clearTimeout(timer);
  // }, [currentSlideIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          nextSlide();
          return 0;
        }
        return prevProgress + 100 / 150; // 100% / (15 seconds * 10 intervals per second)
      });
    }, 100); // Update every 100ms for smoother animation

    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  return (
    <div className="story-viewer">
      <div
        className="slide"
        style={{
          backgroundImage: `url(${currentSlide.imageUrl})`, // Set background image here
          backgroundSize: "cover", // Ensure the image covers the slide container
          backgroundPosition: "center", // Center the image
        }}
      >
        {/* Progress Indicator */}
        <div className="progress-indicator">
          {story.map((slide, index) => (
            <span
              key={index}
              className={`progress-dot ${
                index <= currentSlideIndex ? "active" : ""
              }`}
            ></span>
          ))}
        </div>

        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* Slide Details */}
        <div className="slide-details">
          <h2>{currentSlide.heading}</h2>
          <p>{currentSlide.description}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="prev-button"
        onClick={prevSlide}
        disabled={currentSlideIndex === 0}
      >
        &#10094;
      </button>
      <button
        className="next-button"
        onClick={nextSlide}
        disabled={currentSlideIndex === totalSlides - 1}
      >
        &#10095;
      </button>
    </div>
  );
};

export default StoryViewer;


































.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  height: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
.email-container {
  display: flex;
}

/* Align text to the left */
.modal h2 {
  text-align: center; /* Align header to the left */
  margin-bottom: 20px;
  margin-top: 10px;
}

.modal label {
  display: flex; /* Make labels block-level elements */
  text-align: left; /* Align labels to the left */
  margin: 10px 0 5px; /* Add margin for spacing */
  margin-right: 20px;
  font-weight: bold;
}

.vector {
  margin-left: 290px;
  margin-top: 30px;
  width: 30px;
}

.register {
  background-color: #73abff;
  padding: 7px 14px;
}

.modal input {
  width: 220px; /* Make input fields full width */
  padding: 8px; /* Add padding for better usability */
  margin-bottom: 15px; /* Add space between inputs */
  box-sizing: border-box; /* Ensure padding doesn't affect width */
  text-align: left; /* Align text within input fields to the left */
}

.close-button {
  margin-top: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .modal-overlay {
    position: static; /* Override position to static in mobile view */
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto; /* Ensure modal overlay adjusts its height accordingly */
    top: 0;
    left: 0;
    bottom: -200;
  }

  .modal {
    width: 90%; /* Adjust width to take most of the screen in mobile view */
    margin: 20px; /* Add some margin for better spacing */
  }
}

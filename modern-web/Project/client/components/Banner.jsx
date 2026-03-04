import React from "react";
import { Carousel } from "react-bootstrap";
import RandomFilms from "./RandomFilms";

const Banner = () => {
  const featuredItems = [
    {
      title: "Inception",
      imgSrc: "https://modern-web.s3.us-east-2.amazonaws.com/inception.jpg",
      description: "Rent now for an amazing experience!",
    },
    {
      title: "The Office",
      imgSrc: "https://modern-web.s3.us-east-2.amazonaws.com/the_office.jpg",
      description: "A hilarious series that you must see!",
    },
    {
      title: "Stranger Things",
      imgSrc:
        "https://modern-web.s3.us-east-2.amazonaws.com/stranger_things.avif",
      description: "Get ready for some 80s nostalgia!",
    },
  ];

  return (
    <div>
      <Carousel>
        {featuredItems.map((item, index) => (
          <Carousel.Item key={index}>
            <div
              style={{ position: "relative", width: "100%", height: "500px" }}
            >
              {/* Image */}
              <img
                className="d-block w-100"
                src={item.imgSrc}
                alt={item.title}
                style={{ width: "100%", height: "500px", objectFit: "cover" }}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.9) 100%)",
                }}
              ></div>
            </div>
            {/* Caption */}
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <RandomFilms />
    </div>
  );
};

export default Banner;

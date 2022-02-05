import { useState } from "react";
import PropTypes from "prop-types";

import classes from "./gallery.module.css";

const Gallery = ({ images = [] }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const handleNext = () => setImgIndex((index) => (index + 1) % images.length);
  const handlePrev = () => {
    setImgIndex((index) => {
      index = index - 1;
      index < 1 && (index = images.length - 1);
      return index % images.length;
    });
  };

  return (
    <div className={classes.gallery}>
      {images.length && <img src={images[imgIndex]} alt="" />}
      <span className={classes["left-arrow"]} onClick={handlePrev}>
        &#129168;
      </span>
      <span className={classes["right-arrow"]} onClick={handleNext}>
        &#129170;
      </span>
    </div>
  );
};

export default Gallery;

Gallery.prototype = {
  images: PropTypes.array,
};

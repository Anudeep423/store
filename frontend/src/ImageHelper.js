import React from "react";
import CardMedia from "@material-ui/core/CardMedia";

const ImageHelper = ({ user }) => {
  const imageurl = user
    ? `http://localhost:8000/api/user/photo/${user._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <CardMedia
          component="img"
          alt="Contemplative Reptile"  
          height="220"
          image= {imageurl}
          title="Contemplative Reptile"
        />
  );
};

export default ImageHelper
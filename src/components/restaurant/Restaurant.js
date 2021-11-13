import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Typography from "@mui/material/Typography";

const GreenStyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "green",
  },
});

const BlackStyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "black",
  },
});

// Restaurant card component to encapsulate restaurant infos
// Badge number is used to classify top searchs based on the following criterias:
// - Sort the restaurants by Distance first.
// - After the above process, if two matches are still equal, then the restaurant with a higher customer rating wins.
// - After the above process, if two matches are still equal, then the restaurant with a lower price wins.
// - After the above process, if two matches are still equal, then you can randomly decide the order.
const Restaurant = ({ restaurant, badgeNumber }) => {
  return (
    <Badge
      badgeContent={badgeNumber + "º"}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      color="info"
    >
      <Card sx={{ maxWidth: 330 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://zerogeorge.com/wp-content/uploads/2017/08/Jonathan-Boncek_-Zero-George_Fall-menu_07-30-2015_lamb-belly_3_high-res_jwb-1568x768-c-default.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {restaurant?.restaurantName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <GreenStyledRating
              sx={{ width: "100%", marginBottom: "15px" }}
              readOnly
              name="price"
              precision={0.1}
              value={restaurant.price / 10}
              icon={<MonetizationOnIcon fontSize="inherit" />}
              emptyIcon={<MonetizationOnIcon fontSize="inherit" />}
            />
            <BlackStyledRating
              sx={{ width: "100%" }}
              readOnly
              name="distance"
              precision={0.1}
              value={restaurant.distance / 2}
              icon={<DirectionsCarIcon fontSize="inherit" />}
              emptyIcon={<DirectionsCarIcon fontSize="inherit" />}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Rating
            sx={{ marginLeft: "auto" }}
            name="readonly-rating"
            value={restaurant.rating}
            readOnly
          />
        </CardActions>
      </Card>
    </Badge>
  );
};

export default Restaurant;

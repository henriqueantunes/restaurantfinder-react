import React, { useCallback, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import Rating from "@material-ui/core/Rating";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { debounce } from "lodash";

// Filter header that contains the filter options for customer rating, distance, price and cuisine
// filter is automatically applyed upon changes
const FilterHeader = (props) => {
  const [rating, setRating] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [cuisine, setCuisine] = React.useState("");
  const [cuisines, setCuisines] = React.useState([]);

  // Fetch cuisine data on component startup
  useEffect(() => {
    fetch("http://localhost:8080/getCuisines")
      .then((response) => response.json())
      .then((data) => setCuisines(data))
      .catch(e => setCuisines([]));
  }, []);

  const updateFiltersCallback = () => {
    props.parentCallback({
      distance: distance === 0 ? null : distance,
      price: price === 0 ? null : price,
      customerRating: rating === 0 ? null : rating,
      cuisine: cuisine,
    });
  };

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };
  const sendDistanceChange = (event, newValue) => {
    updateFiltersCallback();
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };
  const sendPriceChange = (event, newValue) => {
    updateFiltersCallback();
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
  useEffect(() => {
    updateFiltersCallback(); // eslint-disable-next-line 
  }, [rating]);

  const sendCuisineChange = (value) => {
    updateFiltersCallback();
  }; // eslint-disable-next-line
  const handler = useCallback(debounce(sendCuisineChange, 1000), [sendCuisineChange]);
  const handleCuisineChange = (event) => {
    let value;
    // Check needed because autocomplete click behavior is different
    // from autocomplete typing
    if (event.type === "click") {
      value = event.target.innerText;
    } else {
      value = event.target.value;
    }
    setCuisine(value);
  };
  useEffect(() => {
    handler(cuisine); // eslint-disable-next-line
  }, [cuisine]);

  return (
    <header className="App-header">
      <div className="filter-component">
        <Typography id="distance-slider" gutterBottom>
          Maximum distance
        </Typography>
        <Slider
          style={{ width: "50%" }}
          sx={{ color: "#ea1d2c" }}
          value={distance}
          onChange={handleDistanceChange}
          onChangeCommitted={sendDistanceChange}
          aria-label="Default"
          aria-labelledby="distance-slider"
          valueLabelDisplay="auto"
          min={0}
          max={10}
        />
      </div>
      <div className="filter-component">
        <Typography id="price-slider" gutterBottom>
          Maximum price
        </Typography>
        <Slider
          style={{ width: "50%" }}
          sx={{ color: "#ea1d2c" }}
          value={price}
          onChange={handlePriceChange}
          onChangeCommitted={sendPriceChange}
          aria-label="Default"
          aria-labelledby="price-slider"
          valueLabelDisplay="auto"
          min={0}
          max={50}
        />
      </div>
      <div className="filter-component">
        <Typography component="legend">Minimum Rating</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={handleRatingChange}
        />
      </div>
      <div className="filter-component">
        <Autocomplete
          freeSolo
          disablePortal
          id="free-solo-2-demo"
          disableClearable
          options={cuisines.map((option) => option.name)}
          onInputChange={handleCuisineChange}
          renderInput={(params) => (
            <TextField
              value={cuisine}
              onChange={handleCuisineChange}
              {...params}
              label="Cuisines"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>
    </header>
  );
};

export default FilterHeader;

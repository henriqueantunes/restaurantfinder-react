import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./header/Header";
import Restaurant from "./restaurant/Restaurant";
import FilterHeader from "./filter/Filter";
import LinearProgress from "@mui/material/LinearProgress";

const { REACT_APP_BACKEND_URL } = process.env;

const initialState = {
  loading: true,
  restaurants: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };
    case "SEARCH_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error.toString(),
      };
    default:
      return state;
  }
};

const App = () => {
  const [restaurantName, setRestaurantName] = React.useState("");
  const [filters, setFilters] = React.useState({});
  const [state, dispatch] = useReducer(reducer, initialState);

  const callback = (value) => {
    setFilters(value);
  };

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_REQUEST",
    });
    setRestaurantName(searchValue);
  };
  useEffect(() => {
    filters.restaurantName = restaurantName;
    fetchRestaurants(filters);
    dispatch({
      type: "SEARCH_REQUEST",
    });
  }, [restaurantName, filters]);

  const fetchRestaurants = (filters) => {
    fetch(REACT_APP_BACKEND_URL + `/findRestaurants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    }).then((response) => {
      if (response.ok) {
        response.json().then((jsonResponse) =>
          dispatch({
            type: "SEARCH_SUCCESS",
            payload: jsonResponse,
          })
        );
      } else {
        response.json().then((jsonResponse) =>
          dispatch({
            type: "SEARCH_FAILURE",
            error: jsonResponse,
          })
        );
      }
    }).catch(error => {
        dispatch({
          type: "SEARCH_FAILURE",
          error: "Backend is probably down",
        })
      }
    );
  };

  const { restaurants, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="Restaurant Finder" search={search} />
      <FilterHeader parentCallback={callback} />
      <div className="restaurants">
        {loading && !errorMessage ? (
          <LinearProgress sx={{ width: "100%", height: "10px" }} />
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          restaurants.map((restaurant, index) => (
            <div key={`${index}-${restaurant.restaurantName}`} className="restaurant-card">
              <Restaurant
                restaurant={restaurant}
                badgeNumber={index + 1}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;

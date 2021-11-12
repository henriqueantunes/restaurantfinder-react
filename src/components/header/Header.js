import React, { useState } from "react";

// Header component that contains the search function by name
const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [oldValue, setOldValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    // Check to not trigger search if value was the same of the last search
    if (oldValue !== searchValue) {
      setOldValue(searchValue);
      props.search(searchValue);
    }
  };

  return (
    <header className="App-header">
      <h2>{props.text}</h2>
      <form className="search">
        <input
          placeholder="Search for a restaurant"
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    </header>
  );
};

export default Header;

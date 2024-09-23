import React from "react";
import styles from "./SearchBar.module.css";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (name: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [name, setName] = useState(""); // State to hold the input value

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    onSearch(name); // Trigger the search in the parent componen
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // Update the state with the input value
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="/action_page.php"
      data-testid="search-btn"
      className={styles.form}
    >
      <label className={styles.labelText}>Search for a book: </label>
      <input
        className={styles.inputStyle}
        name="myInput"
        data-testId={"search-input"}
        value={name} // Bind input value to state
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

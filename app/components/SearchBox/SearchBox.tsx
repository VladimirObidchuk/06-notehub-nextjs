import React, { useState } from "react";
import css from "./SearchBox.module.css";

type Props = {
  onSearch: (search: string) => void;
};

const SearchBox = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        type="text"
        className={css.input}
        value={value}
        placeholder="Search notes"
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </>
  );
};

export default SearchBox;

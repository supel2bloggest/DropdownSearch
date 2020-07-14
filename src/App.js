import React, { useState } from "react";
import "./styles.css";
import DropdownSearch from "./DropdownSearch";

const item = ["Apple", "Papaya", "Banana", "Orange"];

export default function App() {
  const [value, setValue] = useState(0);

  return (
    <div className="App">
      <h1>Dropdown Search</h1>
      <DropdownSearch
        value={value}
        render={item.map(x => {
          return { id: x, name: x };
        })}
        onSelect={setValue}
      />
    </div>
  );
}

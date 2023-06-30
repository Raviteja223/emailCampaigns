import React, { useState } from "react";
import Papa from "papaparse";
import { useDispatch } from "react-redux";

import { contacts } from "../redux/actions.js";

// Allowed extensions for input file

const App = () => {
  // This state will store the parsed data
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // This function will be called when
  // the file input changes
  const handleFileChange = (event) => {
    const contactData = [];
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data;
        const n = rows.length;
        for (let i = 0; i < n; i++) {
          const row = {
            name: rows[i]["Name"],
            email: rows[i]["Email"],
            id: i,
          };
          contactData.push(row);
        }
        // setData(contactData);
        console.log(contactData);
        setData(contactData);
        dispatch(contacts(contactData));
      },
    });
  };

  return (
    <div>
      <label htmlFor="csvInput" style={{ display: "block" }}>
        Enter CSV File
      </label>
      <input
        onChange={handleFileChange}
        type="file"
        name="file"
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <button onChange={() => setData([])}>clear</button>
    </div>
  );
};

export default App;

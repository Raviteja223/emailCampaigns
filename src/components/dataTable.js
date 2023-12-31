import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function DataTable(props) {
  const { cols, rows, width, margin } = props;

  const n = cols.length;

  const colData = [];

  for (let i = 0; i < n; i++) {
    colData.push({
      field: cols[i]["name"],
      headerName: cols[i]["name"],
      width: cols[i]["width"],
    });
  }

  return (
    <div style={{ height: 400, width, margin: "0 0 0 30%" }}>
      <DataGrid
        rows={rows}
        columns={colData}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

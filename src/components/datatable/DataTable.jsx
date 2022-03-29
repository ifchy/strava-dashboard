import "./DataTable.scss";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColums, userRows } from "../../dataTableSource";

const DataTable = () => {
  return (
    <div className="datatable">
      <DataGrid
        rows={userRows}
        columns={userColums}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default DataTable;

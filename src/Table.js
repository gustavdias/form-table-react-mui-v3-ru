import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";

import TrashIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DownArrow from "@material-ui/icons/ArrowDownward";
import UpArrow from "@material-ui/icons/ArrowUpward";
import InlineForm from "./InlineForm";

const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleSave,
  stopEditing
) => {
  const currentlyEditing = editIdx === i;
  return currentlyEditing ? (
    <TableRow key={`inline-form-${i}`} >
      {/*! InlineForm */}
      <InlineForm
        handleSave={handleSave}
        header={header}
        x={x}
        i={i}
        stopEditing={stopEditing}
      />
    </TableRow>
  ) : (
    <TableRow key={`tr-${i}`} >
      {header.map((y, k) => (
        <TableCell key={`trc-${k}`}>{x[y.prop]}</TableCell>
      ))}
      <TableCell>
        <EditIcon onClick={() => startEditing(i)} />

        <TrashIcon onClick={() => handleRemove(i)} />
      </TableCell>
    </TableRow>
  );
};

const Tables = ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleSave,
  stopEditing,
  handleSort,
  sortDirection,
  columnToSort,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {header.map((x, i) => (
          <TableCell key={`thc-${i}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => handleSort(x.prop)}
            >
              <span>{x.name}</span>
              {columnToSort === x.prop ? (
                sortDirection === "asc" ? (
                  <UpArrow />
                ) : (
                  <DownArrow />
                )
              ) : null}
            </div>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleSave,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
);

export default Tables;

import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import orderBy from "lodash/orderBy";
import { Select, MenuItem, TextField } from "@material-ui/core";

import "./App.css";
import Form from "./Form";
import Table from "./Table";

const invertDirection = {
  asc: "desc",
  desc: "asc",
};

//! State ---------------
class App extends Component {
  //! This state contains default users and the original position of the query field on phone
  state = {
    data: [
      {
        firstName: "Анатолий",
        lastName: "Смирнов",
        patronymic: "Сергеевч",
        userStatus: "user",
        phoneNumber: "89237373492",
        email: "anton@outlook.com",
        passsword: "yJG2MuL5piY",
        created: "11/12/2020",
        changed: "12/12/2020",
      },
      {
        firstName: "Зинаида",
        lastName: "Тракторенко",
        patronymic: "Петровна",
        userStatus: "admin",
        phoneNumber: "89237373492",
        email: "zinaida@timesonline.co.uk",
        passsword: "S7p9ReUoQe",
        created: "11/12/2020",
        changed: "",
      },
      {
        firstName: "Софья",
        lastName: "Ткачук",
        patronymic: "Павловна",
        userStatus: "partner",
        phoneNumber: "89237373492",
        email: "sofia@about.me",
        passsword: "MWU9hc",
        created: "11/12/2020",
        changed: "",
      },
    ],
    //query field default on phone
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
    query: "",
    columnToQuery: "phoneNumber",
  };

  //! Handlers -----------------------------
  handleRemove = (i) => {
    this.setState((state) => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  };

  startEditing = (i) => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState((state) => ({
      data: state.data.map((row, j) => (j === i ? x : row)),
    }));
    this.stopEditing();
  };

  handleSort = (columnName) => {
    this.setState((state) => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc",
    }));
  };

  // JSX with the query area and delete, mod, save, cancel, sort-------------------------------------------
  render() {
    const lowerCaseQuery = this.state.query.toLowerCase();
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form
            onSubmit={(submission) =>
              this.setState({
                data: [...this.state.data, submission],
              })
            }
          />
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", margin: "auto" }}>
              <TextField
                placeholder="поиск"
                label="поиск"
                value={this.state.query}
                onChange={(e) => this.setState({ query: e.target.value })}
                floatingLabelFixed
              />
              <Select
                style={{ marginLeft: "1em" }}
                floatingLabelText="Select a column"
                value={this.state.columnToQuery}
                onChange={(event, index, value) =>
                  this.setState({ columnToQuery: value })
                }
              >
                <MenuItem value="email">электронный адрес</MenuItem>
                <MenuItem value="phoneNumber">телефон</MenuItem>
              </Select>
            </div>
          </div>
          <Table
            handleSort={this.handleSort}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            //search
            data={orderBy(
              this.state.query
                ? this.state.data.filter((x) =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.data,
              this.state.columnToSort,
              this.state.sortDirection
            )}
            //! Table header
            header={[
              {
                name: "Фамилия",
                prop: "lastName",
              },
              {
                name: "Имя",
                prop: "firstName",
              },

              {
                name: "Отчество",
                prop: "patronymic",
              },
              {
                name: "статус",
                prop: "userStatus",
              },
              {
                name: "телефон",
                prop: "phoneNumber",
              },
              {
                name: "электронный адрес",
                prop: "email",
              },
              {
                name: "создан",
                prop: "created",
              },
              {
                name: "изменено",
                prop: "changed",
              },
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

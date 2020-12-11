import React from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

//Original State //Error is for validation
export default class Form extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    patronymic: "",
    patronymicError: "",
    phoneNumber: "",
    phoneNumberError: "",
    email: "",
    emailError: "",
    userStatus: "",
    userStatusError: "",
    password: "",
    passwordError: "",
    created: "",
    changed: "",
  };

  change = (e) => {
    // this.props.onChange({ [e.target.name]: e.target.value });

    // returns the month (from 0 to 11)
    var month = new Date().getMonth() + 1;

    // returns the day of the month (from 1 to 31)
    var day = new Date().getDate();

    // returns the year (four digits)
    var year = new Date().getFullYear();

    // let dateOfCreation = new Date();
    let dateOfCreationToString = `${day}/${month}/${year}`;
    this.setState({
      //target is for the content inside it, name is the name of the TextField and e.target.value is what what typed
      [e.target.name]: e.target.value,
      created: dateOfCreationToString,
    });
  };

  //! Validation-----------------------------------------------
  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      patronymicError: "",
      phoneNumberError: "",
      emailError: "",
      userStatusError: "",
      passwordError: "",
    };

    if (this.state.password.length < 5) {
      isError = true;
      errors.usernameError = "password needs to be atleast 5 characters long";
    }


    var n = 1234567890
    if (isNaN(n) && 12 < n.length < 9){
   console.log("true")}


    if (isNaN(this.state.phoneNumber) && 12 < this.state.phoneNumber.length < 9) {
      isError = true;
      errors.usernameError = "password needs to be atleast 5 characters long";
    }

    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };
  //! End of Validation -------------------------

  //! Submit logic ----------------------
  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        patronymic: "",
        patronymicError: "",
        phoneNumber: "",
        phoneNumberError: "",
        email: "",
        emailError: "",
        userStatus: "",
        userStatusError: "",
        password: "",
        passwordError: "",
        created: "",
        changed: "",
      });
    }
  };
  //! End of Submit logic ----------------------

  //JSX ------------------------------------
  render() {
    return (
      <form>
        <div>
          <TextField
            name="lastName"
            placeholder="Фамилия"
            label="Фамилия"
            value={this.state.lastName}
            onChange={(e) => this.change(e)}
            errorText={this.state.lastNameError}
            floatingLabelFixed
          />
        </div>
        <div>
          {" "}
          <TextField
            name="firstName"
            placeholder="Имя"
            label="Имя"
            value={this.state.firstName}
            onChange={(e) => this.change(e)}
            errorText={this.state.firstNameError}
            floatingLabelFixed
          />
        </div>

        <div>
          {" "}
          <TextField
            name="patronymic"
            placeholder="Отчество"
            label="Отчество"
            value={this.state.patronymic}
            onChange={(e) => this.change(e)}
            errorText={this.state.patronymicError}
            floatingLabelFixed
          />
        </div>

        <div>
          <TextField
            name="email"
            placeholder="электронный адрес"
            label="электронный адрес"
            value={this.state.email}
            onChange={(e) => this.change(e)}
            errorText={this.state.emailError}
            floatingLabelFixed
          />
        </div>

        <div>
          <TextField
            name="phoneNumber"
            placeholder="телефон"
            label="телефон"
            value={this.state.phoneNumber}
            onChange={(e) => this.change(e)}
            errorText={this.state.phoneNumberError}
            floatingLabelFixed
          />
        </div>

        <div>
          <TextField
            name="userStatus"
            placeholder="статус пользователя"
            label="статус пользователя"
            value={this.state.userStatus}
            onChange={(e) => this.change(e)}
            errorText={this.state.userStatusError}
            floatingLabelFixed
          />
        </div>

        <div>
          <TextField
            name="password"
            placeholder="пароль"
            label="пароль"
            value={this.state.password}
            onChange={(e) => this.change(e)}
            errorText={this.state.passwordError}
            type="password"
            floatingLabelFixed
          />
        </div>
        <br />
        <div>
          <Button
            label="Submit"
            onClick={(e) => this.onSubmit(e)}
            variant="contained"
            color="primary"
          >
            сохранить
          </Button>
        </div>
      </form>
    );
  }
}

// let dateOfCreation  = new Date()
// dateOfCreationToString = dateOfCreation.toTimeString()

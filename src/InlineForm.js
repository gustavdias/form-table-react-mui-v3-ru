import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import { TextField, TableCell } from "@material-ui/core";

export default class InlineForm extends React.Component {
  // Use Props inside constructor = pass props into super
  constructor(props) {
    super(props);
    this.state = {
      values: {
        ...props.x,
      },
      errors: {
        firstName: "",
        lastName: "",
        patronymic: " ",
        email: "",
        password: "",
        phoneNumber: "",
        userStatus: " ",
        changed: " ",
      },
    };
  }

  //! Handle change of fields in editing

  change = (e) => {
    // returns the month (from 0 to 11)
    var month = new Date().getMonth() + 1;

    // returns the day of the month (from 1 to 31)
    var day = new Date().getDate();

    // returns the year (four digits)
    var year = new Date().getFullYear();

    // let dateOfCreation = new Date();
    let dateOfModificationToString = `${day}/${month}/${year}`;

    const { name, value } = e.target;
    this.setState((state) => ({
      values: {
        ...state.values,
        [name]: value,
        changed: dateOfModificationToString, //! date of last change!!!
      },
    }));
  };

  //! Validation for editing ------------------------

  validate = () => {
    let isError = false;
    const errors = {
      firstName: "",
      lastName: "",
      patronymic: " ",
      email: "",
      password: "",
      phoneNumber: "",
      userStatus: " ",
    };


//!

// const { phoneNumber, email, password } = this.state.values;

// if (password.length < 5) {
//   isError = true;
//   errors.phoneNumber = "минимум 5 символов";
// }

// if (12 < phoneNumber.length < 9) {
//   isError = true;
//   errors.phoneNumber = "номер недействителен";
// }

// if (email.indexOf("@") === -1) {
//   isError = true;
//   errors.email = "недействительна email";
// }


//!
    const { phoneNumber, email } = this.state.values;

    if (phoneNumber.length < 5) {
      isError = true;
      errors.phoneNumber = "минимум 5 символов";
    }

    if (email.indexOf("@") === -1) {
      isError = true;
      errors.email = "недействительна email";
    }

    this.setState({
      errors,
    });

    return isError;
  };

  // On Submit for editing V(save) or X(cancel)
  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.handleSave(this.props.i, this.state.values);
    }
  };


  render() {
    // const { header, x, i } = this.props;

    const { header } = this.props;
    return [
      header.map((y, k) => (
        <TableCell key={`trc-${k}`}>
          <TextField
            name={y.prop}
            onChange={this.change}
            value={this.state.values[y.prop]}
            helperText={this.state.errors[y.prop]}
          />
        </TableCell>
      )),
      <TableCell key="icon-row-column">
        <CheckIcon onClick={this.onSubmit} />
        <CancelIcon onClick={this.props.stopEditing} />
      </TableCell>,
    ];
  }
}

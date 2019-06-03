import React, { Component } from "react";
import UserForm from "./UserForm"


class UserNew extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <UserForm history={this.props.history} onClose={this.props.onClose} />
    );
  }
}

export default UserNew;

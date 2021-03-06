import React, { Component } from "react";
import UserForm from "./UserForm"


class UserEdit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const user_id = this.props.user_id || this.props.match.params.id;

    return (
      <UserForm user_id={user_id} history={this.props.history} onClose={this.props.onClose} />
    );
  }
}

export default UserEdit;

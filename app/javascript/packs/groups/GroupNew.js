import React, { Component } from "react";
import GroupForm from "./GroupForm"


class GroupEdit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GroupForm history={this.props.history} onClose={this.props.onClose} />
    );
  }
}

export default GroupEdit;

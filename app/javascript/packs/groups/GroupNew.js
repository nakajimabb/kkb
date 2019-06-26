import React, { Component } from "react";
import GroupForm from "./GroupForm"


class GroupEdit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GroupForm {...this.props} />
    );
  }
}

export default GroupEdit;

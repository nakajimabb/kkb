import React, { Component } from "react";
import GroupForm from "./GroupForm"


class GroupEdit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const group_id = this.props.group_id || this.props.match.params.id;

    return (
      <GroupForm group_id={group_id} {...this.props} />
    );
  }
}

export default GroupEdit;


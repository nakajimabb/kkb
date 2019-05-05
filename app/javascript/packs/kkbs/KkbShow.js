import React, { Component } from "react";
import KkbBbs from "./KkbBbs";


class KkbShow extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.history.push('/kkbs')
  }

  render() {
    const kkb_id = this.props.match.params.id;
    return (
      <KkbBbs kkb_id={kkb_id} onClose={this.handleClose} />
    );
  }
}

export default KkbShow;

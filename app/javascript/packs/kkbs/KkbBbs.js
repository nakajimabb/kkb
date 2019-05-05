import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import env from "../environment";


class KkbBbs extends Component {
  state = {
    kkb: {},
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateKkb(this.props.kkb_id)
  }

  updateKkb(kkb_id) {
    const axios = require('axios');
    axios.get(env.API_ORIGIN + 'api/kkbs/' + kkb_id)
      .then((results) => {
        this.setState({kkb: results.data});
      })
      .catch((data) =>{
        alert('KKBの取得の失敗しました。');
      })
  }

  render() {
    return (
      <Dialog
        onClose={this.props.onClose}
        aria-labelledby="customized-dialog-title"
        fullScreen
        open={isFinite(this.props.kkb_id)}
      >
        <AppBar>
          <Toolbar>
            <Typography color="inherit" variant="h6" style={{ flex: 1 }}>
              {this.props.kkb_id} {this.state.kkb.title}
            </Typography>
            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close" >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogTitle id="customized-dialog-title" onClose={this.props.onClose}>
          Modal title
        </DialogTitle>
        <DialogContent>
          <Typography>
            <span dangerouslySetInnerHTML={{__html: this.state.kkb.content}} />
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }
}

export default KkbBbs;

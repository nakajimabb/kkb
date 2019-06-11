import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AsyncSelect from 'react-select/async';
import { withStyles } from "@material-ui/core/styles";
import { csrfToken } from '@rails/ujs';
import { str } from "../tools";
import axios from "../axios";
import env from "../environment";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 2 * theme.spacing.unit,
  },
  select: {
    width: 200,
  },
});

class GroupForm extends Component {
  state = {
    group: {group_users_attributes: []},
    group_users: [],
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.axiosProc = this.axiosProc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
  }

  componentDidMount() {
    this.showGroup();
  }

  onClose() {
    if(this.props.onClose){
      this.props.onClose();
    } else {
      this.props.history.push('/groups');
    }
  }

  handleChange = name => event => {
    let group = Object.assign({}, this.state.group);
    this.setState({ group: Object.assign(group, { [name]: event.target.value })});
  };

  onChangeUser = index => value => {
    let group_user = this.state.group.group_users_attributes[index];
    if(value) {
      group_user.user_id = value.value;
      group_user.user_label = value.label;
    } else {
      group_user.user_id = null;
      group_user.user_label = null;
    }
    this.setState({ group: this.state.group});
  };

  getUsers (input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return axios.get(env.API_ORIGIN + `api/users/autocomplete?name=${input}`)
      .then((response) => {
        return response.data.map(user => ({value: user.id, label: user.name+ '(' + user.code + ')'}));
      }).catch(err => {
        alert(err);
      });
  }

  axiosProc(action) {
    switch(action) {
      case 'new':
        return axios.get(env.API_ORIGIN + 'api/groups/new');
      case 'edit':
        return axios.get(env.API_ORIGIN + `api/groups/${this.props.group_id}/edit`);
      case 'create':
        return axios.post(env.API_ORIGIN + 'api/groups', this.state.group);
      case 'update':
        return axios.patch(env.API_ORIGIN + `api/groups/${this.props.group_id}`, this.state.group);
    }
  }

  showGroup() {
    this.axiosProc(this.props.group_id ? 'edit' : 'new')
      .then((results) => {
        this.setState({group: results.data});
      })
      .catch(err => {
        alert(err);
      })
  }

  saveGroup() {
    this.axiosProc(this.props.group_id ? 'update' : 'create')
      .then((results) => {
        this.onClose();
      })
      .catch(err => {
        alert(err);
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        onClose={this.onClose}
        aria-labelledby="customized-dialog-title"
        fullScreen
        open={true}
      >
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={this.onClose} aria-label="Close" >
              <CloseIcon />
            </IconButton>
            <Typography color="inherit" variant="h6" style={{ flex: 1 }}>
              グループ編集 { this.state.group.name } { this.state.group.code }
            </Typography>
            <Button color="inherit" onClick={this.saveGroup}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle id="customized-dialog-title" onClose={this.onClose}>
          { this.state.group.name }
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <TextField
              id="group_code"
              label="code"
              value={str(this.state.group.code)}
              className={classes.textField}
              onChange={this.handleChange('code')}
              margin="normal"
              required
            />
            <TextField
              id="group_name"
              label="name"
              value={str(this.state.group.name)}
              className={classes.textField}
              onChange={this.handleChange('name')}
              margin="normal"
              required
            />
          </Grid>
          {this.state.group.group_users_attributes.map((group_user, index) => {
            return (
              <Grid container>
                <AsyncSelect
                  className={classes.select}
                  value={{value: group_user.user_id, label: group_user.user_label}}
                  loadOptions={this.getUsers}
                  onChange={this.onChangeUser(index)}
                  isClearable={group_user.user_id}
                />
              </Grid>
            );
          })
          }
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GroupForm);

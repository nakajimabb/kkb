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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from "@material-ui/core/styles";
import { csrfToken } from '@rails/ujs';
import { str } from "../tools";
import axios from "../axios";
import env from "../environment";
import CustomizedSnackbar from "../snackbars/CustomizedSnackbar";
import { AsyncSelect } from "../react-select/ReactSelect";
import I18n from "../translations";


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
  icon: {
    margin: theme.spacing(1),
    padding: 1,
  },
});

const collectErrors = (response) => {
  let errors = {};

  if (response.status === 404) {
    errors.push(response.error);
    return errors
  }

  const fields = Object.keys(response.data);
  fields.forEach(field => {
    console.log(field);
    response.data[field].forEach(message => {
      let field_i18n = I18n.t('activerecord.attributes.group.' + field);
      errors[field] = field_i18n + message
    })
  });
  return errors
};

class GroupForm extends Component {
  state = {
    group: {group_users_attributes: []},
    group_users: [],
    errors: {},
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.axiosProc = this.axiosProc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelectGroupUser = this.onSelectGroupUser.bind(this);
    this.onChangeGroupUser = this.onChangeGroupUser.bind(this);
    this.onAddGroupUser = this.onAddGroupUser.bind(this);
    this.onDeleteGroupUser = this.onDeleteGroupUser.bind(this);
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

  onSelectGroupUser = index => value => {
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

  onChangeGroupUser = index => event => {
    let group_user = this.state.group.group_users_attributes[index];
    group_user.member_type = event.target.value;
    this.setState({ group: this.state.group});
  };

  onAddGroupUser = event => {
    this.state.group.group_users_attributes.push({member_type: 'normal'});
    this.setState({ group: this.state.group});
  };

  onDeleteGroupUser = index => event => {
    let group_user = this.state.group.group_users_attributes[index];
    group_user._destroy = 1;
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
      .then((response) => {
        this.onClose();
      })
      .catch(err => {
        this.setState({errors: collectErrors(err.response)});
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
          {console.log(this.state.errors)}
          { (Object.keys(this.state.errors).length > 0) ?
            (<CustomizedSnackbar
              variant="error"
              message={
                Object.keys(this.state.errors).map(key => {
                  return (
                    <div>{this.state.errors[key]}</div>
                  );
                })
              }
            />) : null
          }
          <Grid container>
            <TextField
              id="group_code"
              label="code"
              error={this.state.errors.code}
              value={str(this.state.group.code)}
              className={classes.textField}
              onChange={this.handleChange('code')}
              margin="normal"
              required
            />
            <TextField
              id="group_name"
              label="name"
              error={this.state.errors.name}
              value={str(this.state.group.name)}
              className={classes.textField}
              onChange={this.handleChange('name')}
              margin="normal"
              required
            />
          </Grid>
          <Typography variant="h6" style={{margin: 10}}>
            member list
          </Typography>
          {this.state.group.group_users_attributes.map((group_user, index) => {
            return group_user._destroy ? null :
            (
              <Grid container>
                <AsyncSelect
                  className={classes.select}
                  style={{marginTop: 0, marginBottom: 0}}
                  value={group_user.user_id ? {value: group_user.user_id, label: group_user.user_label} : null}
                  loadOptions={this.getUsers}
                  onChange={this.onSelectGroupUser(index)}
                  isClearable={group_user.user_id}
                  // label="member's name"
                  placeholder="code or name"
                />
                <Select
                  value={group_user.member_type}
                  onChange={this.onChangeGroupUser(index)}
                >
                  <MenuItem value={'normal'}>normal</MenuItem>
                  <MenuItem value={'hidden'}>hidden</MenuItem>
                </Select>
                <IconButton
                  aria-label="Delete"
                  size="small"
                  className={classes.icon}
                  onClick={this.onDeleteGroupUser(index)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Grid>
            );
          })
          }
          <Grid container style={{margin: 10}}>
            <Button variant="outlined" color="primary" size="small" onClick={this.onAddGroupUser} >
              Add Member
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GroupForm);

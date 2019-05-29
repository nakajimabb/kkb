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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
});


class UserForm extends Component {
  state = {
    user: {},
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.axiosProc = this.axiosProc.bind(this);
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
  }

  componentDidMount() {
    this.showUser();
  }

  onClose() {
    if(this.props.onClose){
      this.props.onClose();
    } else {
      this.props.history.push('/users');
    }
  }

  handleChange = name => event => {
    let user = Object.assign({}, this.state.user);
    this.setState({ user: Object.assign(user, { [name]: event.target.value })});
  };

  axiosProc(action) {
    switch(action) {
      case 'new':
        return axios.get(env.API_ORIGIN + 'api/users/new');
      case 'edit':
        return axios.get(env.API_ORIGIN + `api/users/${this.props.user_id}/edit`);
      case 'create':
        return axios.post(env.API_ORIGIN + 'api/users', this.state.user);
      case 'update':
        return axios.patch(env.API_ORIGIN + `api/users/${this.props.user_id}`, this.state.user);
    }
  }

  showUser() {
    this.axiosProc(this.props.user_id ? 'edit' : 'new')
      .then((results) => {
        this.setState({user: results.data});
      })
      .catch((data) =>{
        alert('社員の取得の失敗しました。');
      })
  }

  saveUser() {
    this.axiosProc(this.props.user_id ? 'update' : 'create')
      .then((results) => {
        this.setState({user: results.data});
        this.onClose();
      })
      .catch((data) =>{
        alert('社員の保存の失敗しました。');
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
              社員情報編集 { this.state.user.last_name } { this.state.user.first_name }
            </Typography>
            <Button color="inherit" onClick={this.saveUser}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle id="customized-dialog-title" onClose={this.onClose}>
          { this.state.user.first_name }
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <TextField
              id="user_code"
              label="code"
              value={str(this.state.user.code)}
              className={classes.textField}
              onChange={this.handleChange('code')}
              margin="normal"
              required
            />
          </Grid>
          <Grid container>
            <TextField
              id="user_last_name"
              label="last name"
              value={str(this.state.user.last_name)}
              className={classes.textField}
              onChange={this.handleChange('last_name')}
              margin="normal"
            />
            <TextField
              id="user_first_name"
              label="first name"
              value={str(this.state.user.first_name)}
              className={classes.textField}
              onChange={this.handleChange('first_name')}
              margin="normal"
            />
          </Grid>
          <Grid container>
            <TextField
              id="user_last_kana"
              label="last kana"
              value={str(this.state.user.last_kana)}
              className={classes.textField}
              onChange={this.handleChange('last_kana')}
              margin="normal"
            />
            <TextField
              id="user_first_kana"
              label="first kana"
              value={str(this.state.user.first_kana)}
              className={classes.textField}
              onChange={this.handleChange('first_kana')}
              margin="normal"
            />
          </Grid>
          <Grid container>
            <TextField
              id="user_email"
              label="email"
              value={str(this.state.user.email)}
              className={classes.textField}
              style={{width: 400}}
              onChange={this.handleChange('email')}
              margin="normal"
              required
            />
          </Grid>
          <Grid container>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="user_sex">sex</InputLabel>
              <Select
                value={this.state.user.sex}
                onChange={this.handleChange('sex')}
                inputProps={{
                  name: 'user_sex',
                  id: 'user_sex',
                }}
              >
                <MenuItem value={'unknown'}></MenuItem>
                <MenuItem value={'male'}>male</MenuItem>
                <MenuItem value={'female'}>female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container>
            <TextField
              type="date"
              id="user_birthday"
              label="birthday"
              value={str(this.state.user.birthday, null)}
              className={classes.textField}
              onChange={this.handleChange('birthday')}
              margin="normal"
            />
          </Grid>
          <Grid container>
            <TextField
              id="user_password"
              label="password"
              type="password"
              value={str(this.state.user.password)}
              autoComplete=""
              className={classes.textField}
              onChange={this.handleChange('password')}
              margin="normal"
            />
            <TextField
              id="user_password_confirmation"
              label="password confirmation"
              type="password"
              value={str(this.state.user.password_confirmation)}
              autoComplete=""
              className={classes.textField}
              onChange={this.handleChange('password_confirmation')}
              margin="normal"
            />
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UserForm);

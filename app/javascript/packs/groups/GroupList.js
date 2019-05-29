import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import axios from "../axios";
import env from "../environment";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  container: {
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    marginRight: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
        <div className={classes.root}>
          <IconButton
              onClick={this.handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
              onClick={this.handleBackButtonClick}
              disabled={page === 0}
              aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
              onClick={this.handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
              onClick={this.handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit,
  },
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions
);

class GroupList extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    this.state = {
      groups: [],
      users: [],
      page: 0,
      rowsPerPage: 10,
      count: 0,
      search: {},
    };
  }

  handleChange = name => event => {
    let search = this.state.search;
    search[name] = event.target.value;
    this.setState({ search, page: 0 });
    this.updateList(0, this.state.rowsPerPage, search);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.updateList(page, this.state.rowsPerPage, this.state.search);
  };

  handleChangeRowsPerPage = event => {
    let rows_per_page = +event.target.value;
    this.setState({ page: 0, rowsPerPage: rows_per_page });
    this.updateList(0, rows_per_page, this.state.search);
  };

  updateList(page, per, search) {
    let params = { page: page + 1, per, search} ;
    axios.get(env.API_ORIGIN + 'api/groups/', { params })
        .then((results) => {
          this.setState({groups: results.data.groups, users: results.data.users, count: results.data.total_count});
        })
        .catch((data) =>{
          alert('社員一覧の取得の失敗しました。');
        })
  }

  componentDidMount() {
    this.updateList(this.state.page, this.state.rowsPerPage);
  }

  render() {
    const {classes} = this.props;
    const {groups, users, rowsPerPage, page, count} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

    return (
      <div>
        <Grid container>
          <Input
              id="group_name"
              name="group_name"
              placeholder="グループ名・コード"
              className={classes.input}
              onChange={this.handleChange('name')}
              margin="dense"
          />
        </Grid>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <colgroup>
                <col style={{width:'20%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'60%'}}/>
              </colgroup>
              <TableHead>
                <TableRow>
                  <CustomTableCell>名前</CustomTableCell>
                  <CustomTableCell>コード</CustomTableCell>
                  <CustomTableCell>メンバー</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map(group => (
                    <TableRow key={group.id}>

                      <CustomTableCell>{group.name}</CustomTableCell>
                      <CustomTableCell>{group.code}</CustomTableCell>
                      <CustomTableCell>
                        {users[group.id].map(
                            elem => elem['code'] + ':' + elem['last_name'] + ' ' + elem['first_name']
                        ).join(',')}
                      </CustomTableCell>
                    </TableRow>
                ))}
                {emptyRows > 0 && (
                    <TableRow style={{height: 48 * emptyRows}}>
                      <TableCell colSpan={3}/>
                    </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                      rowsPerPageOptions={[10, 15, 20, 50]}
                      colSpan={3}
                      count={count}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(GroupList);

import React, { Component, Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import axios from "../axios";
import env from '../environment';
import KkbBbs from "./KkbBbs";


const styles = {
    title: {
        flex: 1,
        display: 'block',
        marginRight: '5px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    content: {
      fontSize: '75%',
      height: '150px',
      padding: '0 5px 10px 10px',
      whiteSpace: 'pre-line',
    },
  button: {
    width: 24,
    height: 24,
    padding: 0
  },
  icon: {
    fontSize: 14,
    color: '#fffff'
  },
  tooltip: {
    marginLeft: 2
  },
};


class KkbList extends Component {
    constructor(props) {
        super(props);

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.updateList = this.updateList.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            kkbs: [],
            page: 0,
            per: 24,
            count: 1000,
            current_id: NaN,
        };
    }

    updateList(page, per) {
        axios.get(env.API_ORIGIN + 'api/kkbs/', {params: {page: page + 1, per}})
          .then((results) => {
              this.setState({kkbs: results.data.kkbs, count: results.data.total_count});
        })
        .catch((data) =>{
            alert('KKB一覧の取得の失敗しました。');
        })
    }

    handleChangePage = (event, page) => {
      this.setState({ page });
      this.updateList(page, this.state.per);
    };

    handleChangeRowsPerPage = event => {
      this.setState({ per: event.target.value });
      this.updateList(this.state.page, event.target.value);
    };

    handleClick(event) {
      this.setState({current_id: event.currentTarget.dataset.kkb_id});
    };

    handleClose(event) {
      this.setState({current_id: NaN});
    }

    componentDidMount() {
      this.updateList(this.state.page, this.state.per);
    }

    render() {
      const classes = styles;
      const { anchorEl } = this.state;
      let menu_id = anchorEl ? anchorEl.dataset.kkb_id : null;

      const list = this.state.kkbs.map((kkb, index) => {
        return (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Card>
              <CardActions>
                <Typography style={classes.title}>
                  <b>{kkb.id}</b>.{kkb.title}
                </Typography>
                <a data-remote="true" href={`/kkbs/${kkb.id}/edit`} >
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    data-kkb_id={kkb.id}
                    style={classes.button}
                    iconStyle={classes.icon}
                    tooltipStyles={classes.tooltip}
                  >
                    <EditIcon />
                  </IconButton>
                </a>
              </CardActions>
              <Divider />
              <CardActionArea>
                <CardContent data-kkb_id={kkb.id} style={classes.content} onClick={this.handleClick}>
                  {kkb.headline}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      });

      return (
        <Fragment>
          <Grid container spacing={16}>
            {list}
          </Grid>
          <TablePagination
            rowsPerPageOptions={[12, 18, 24, 36, 60]}
            component="div"
            count={this.state.count}
            rowsPerPage={this.state.per}
            page={this.state.page}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
          {(() => {
            if(this.state.current_id)
              return (<KkbBbs kkb_id={this.state.current_id} onClose={this.handleClose} />);
          })()}
        </Fragment>
      );
  }
}

export default KkbList;

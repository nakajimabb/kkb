import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import env from './environment/index';


const styles = {
    card: {
        minWidth: 100,
    },
    title: {
        display: 'block',
        marginRight: '5px',
        overflow: 'hidden',
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis',
    },
    content: {
      fontSize: '90%',
      height: '160px',
      padding: '0 5px 10px 10px',
    },
};

class KkbList extends Component {
    constructor(props) {
        super(props);

        this.update_list = this.update_list.bind(this);
        this.state = {
            kkbs: []
        };
    }

    update_list() {
        const axios = require('axios');
        axios.get(env.API_ORIGIN + 'kkbs/')
          .then((results) => {
              this.setState({kkbs: results.data});
          })
          .catch((data) =>{
              alert('KKB一覧の取得の失敗しました。');
          })
    }

    componentDidMount() {
        this.update_list()
    }

    render() {
      const classes = styles;
      const list = this.state.kkbs.map((kkb, index) => {
        return (
          <Grid item xs={6} sm={4} md={3} lg={2} >
            <Card className={classes.card} key={index}>
              <CardActions style={classes.title}>
                <Typography>
                  <b>{kkb.id}</b>.{kkb.title}
                </Typography>
              </CardActions>
              <CardActionArea>
                <CardContent style={classes.content}>
                  {kkb.content}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      });

      return (
        <Grid container spacing={16}>
          {list}
        </Grid>
      );
  }
}

export default KkbList;

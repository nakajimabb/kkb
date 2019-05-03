import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom'
import routes from './routes';


class Sidebar extends React.Component {

  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <Link to={prop.path} key={key}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={prop.name} />
          </ListItem>
        </Link>
      );
    });
  };

  render() {
    return (
      <div>{this.createLinks(routes)}</div>
    );
  }
};

export default Sidebar;

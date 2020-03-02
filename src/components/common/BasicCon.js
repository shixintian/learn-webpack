import React, { Component } from 'react';
import {
  Route, Switch, Link, HashRouter
} from 'react-router-dom';
import PageOne from '../example/PageOne';

class BasicCon extends Component {
  views = {
    page1: PageOne
  }

  render() {
    return (
      <HashRouter>
        <ul>
          {
            Object.entries(this.views).map(([viewName]) => (
              <li key={viewName}>
                <Link to={`/${viewName}`}>{viewName}</Link>
              </li>
            ))
          }
        </ul>
        <Switch>
          {
          // eslint-disable-next-line
          Object.entries(this.views).map(([viewName, Comp]) => {
            return (
              <Route
                key={viewName}
                path={`/${viewName}`}
                render={() => <Comp />}
              />
            );
          })
        }
        </Switch>
      </HashRouter>
    );
  }
}

export default BasicCon;

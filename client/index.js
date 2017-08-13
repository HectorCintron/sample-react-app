import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Apps from './components/Apps/Apps.jsx';
import AppNew from './components/Apps/AppNew.jsx';
import AppView from './components/Apps/AppView.jsx';
import AppEdit from './components/Apps/AppEdit.jsx';
import Header from './components/Header/Header.jsx';
import Settings from './components/Settings/Settings.jsx';
import './common.scss';

// const AppEdit = undefined;
const style = {
  height: '100%',
  textAlign: 'center',
};
ReactDOM.render(
  <BrowserRouter>
    <div style={style}>
      <Header />
      <div className="App">
        <div className="Body">
          <Route exact path="/" component={Apps} />
          <Route exact path="/apps" component={Apps} />
          <Route exact path="/apps/new" component={AppNew} />
          <Route exact path="/apps/:id" component={AppView} />
          <Route exact path="/apps/:id/edit" component={AppEdit} />
          <Route exact path="/settings" component={Settings} />
        </div>
      </div>
    </div>
  </BrowserRouter>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'));

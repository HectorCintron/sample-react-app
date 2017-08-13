import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import 'whatwg-fetch';
import { Grid, Row } from 'react-flexbox-grid';
import { AppCard, CreateCard } from '../Card';
import SearchEnhanced from '../Search/SearchEnhanced.jsx';
import SortEnhanced from '../Sort/SortEnhanced.jsx';
import './Apps.scss';

class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      loading: true,
    };
    this.state.searchTerm = '';
  }

  componentDidMount() {
    this.loadApps();
  }

  componentDidUpdate() {
    
  }

  handleDelete = (id) => {
    let apps = this.state.apps;
    let sliceIndex;
    apps.forEach((app, index) => {
      /* eslint-disable no-underscore-dangle */
      if (app._id === id) {
        sliceIndex = index;
      }
    });
    apps = update(this.state.apps, { $splice: [[sliceIndex, 1]] });
    this.setState({
      apps,
    });
    this.deleteApp(id);
  }

  handleDownload = (id) => {
    const appData = this.getData(id);
  }

  handleSearchChange = (e, data) => {
    this.setState({
      searchTerm: data.value,
    });
  }

  handleSortChange = (e, data) => {
    const sortTerm = data.value;
    const descending = !this.state.sortDescending;
    let sortFunc;
    switch (sortTerm) {
      case 'title':
        sortFunc = this.sortTitle(descending);
        break;
      case 'lastEdit':
        sortFunc = this.sortLastEdit(descending);
        break;
      default:
        sortFunc = null;
        break;
    }
    this.setState({
      sortFunc,
      sortDescending: descending,
    });
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  }

  loadApps = () => {
    /* eslint-disable no-undef */
    fetch('/api/apps')
    .then(res => res.json())
    .then((apps) => {
      this.setState({
        apps,
      });
      this.toggleLoading();
    },
    );
  }

  deleteApp = (id) => {
    /* eslint-disable no-undef */
    fetch(`/api/apps/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then((data) => {
      if (data.result.ok === 1) {
        this.setState({ status: 'success' });
      } else {
        this.setState({ status: 'error' });
      }
    });
  }

  sortTitle = (des) => {
    return (
      (a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return (des ? 1 : -1);
        }
        if (titleA > titleB) {
          return (des ? -1 : 1);
        }
        return 0;
      }
    );
  }

  sortLastEdit = (des) => {
    return (
      (a, b) => {
        const dateA = (new Date(a.lastEdit)).getTime();
        const dateB = (new Date(b.lastEdit)).getTime();
        if (dateA < dateB) {
          return (des ? 1 : -1);
        }
        if (dateA > dateB) {
          return (des ? -1 : 1);
        }
        return 0;
      }
    );
  }

  render() {
    const { loading, status, searchTerm, sortFunc } = this.state;
    const error = status === 'error';
    const success = status === 'success';
    const redirect = status === 'redirect' ? <Redirect to="/apps" /> : null;
    return (
      <Grid fluid>
        {redirect}
        <Message
          hidden={!error}
          error
          header="Action Forbidden"
          content="Erm, something isn't right..."
        />
        <Message
          hidden={!success}
          success
          header="Success!"
        />
        <Dimmer active={loading} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Row center="xs" className="row-wrapper top-row">
          <SearchEnhanced onSearchChange={this.handleSearchChange} value={this.state.searchTerm} />
          <SortEnhanced onChange={this.handleSortChange} />
        </Row>
        <Row center="xs" start="md" className="row-wrapper">
          <CreateCard />
          {this.state.apps
            .filter(app => `${app.title} ${app.description}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0)
            .sort(sortFunc)
            .map(app =>
              (<AppCard
                /* eslint-disable no-underscore-dangle */
                key={app._id}
                id={app._id}
                title={app.title}
                description={app.description}
                lastEdit={app.lastEdit}
                onDelete={this.handleDelete}
              />),
          )}
        </Row>
      </Grid>
    );
  }
}

export default Apps;

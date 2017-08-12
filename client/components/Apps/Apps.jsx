import React from 'react';
import update from 'immutability-helper';
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
    this.apps = [];
  }

  componentDidMount() {
    this.loadApps();
  }

  componentWillUpdate() {
    this.apps = [];
    this.state.apps.map(app =>
      this.apps.push(<AppCard
        /* eslint-disable no-underscore-dangle */
        key={app._id}
        id={app._id}
        title={app.title}
        description={app.description}
        lastEdit={app.lastEdit}
        onDelete={this.handleDelete}
      />),
    );
  }

  handleDelete = (id) => {
    const apps = this.state.apps;
    let sliceIndex;
    apps.forEach((app, index) => {
      if (app._id === id) {
        sliceIndex = index;
      }
    });
    this.setState({
      apps: update(this.state.apps, { $splice: [[sliceIndex, 1]] }),
    });
    this.deleteApp(id);
  }

  handleDownload = (id) => {
    const appData = this.getData(id);
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
      debounce(() => {
        this.setState({ status: 'redirect' });
      }, 1500)();
    });
  }

  render() {
    const { loading, status } = this.state;
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
          <SearchEnhanced />
          <SortEnhanced />
        </Row>
        <Row center="xs" start="md" className="row-wrapper">
          <CreateCard />
          {this.apps}
        </Row>
      </Grid>
    );
  }
}

export default Apps;

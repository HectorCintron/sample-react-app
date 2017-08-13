import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { Form, Input, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.loading = true;
  }

  componentDidMount() {
    this.loadApp();
    this.state.loading = false;
  }

  loadApp = () => {
    const id = this.props.match.params.id;
    /* eslint-disable no-undef */
    fetch(`/api/apps/${id}`)
    .then(res => res.json())
    .then((appData) => {
      const { _id, title, description, lastEdit } = appData;
      const app = {
        id: _id,
        title,
        description,
        lastEdit,
      };
      this.setState(app);
    },
    );
  }

  render() {
    const { id, title, description, lastEdit, loading } = this.state;
    return (
      <Form
        size="large"
        key="large"
        loading={loading}
      >
        <Form.Field
          required
          value={title}
          control={Input}
          label="Title"
          name="title"
          placeholder="Title"
        />
        <Form.Field
          required
          value={description}
          control={TextArea}
          label="Description"
          name="description"
          placeholder="Describe this application ..."
        />
        <h3>Last edit: {lastEdit}</h3>
        <Link to={{
          pathname: `/apps/${id}/edit`,
          state: { id, title, description, lastEdit },
        }}
        >
          Edit
        </Link>
      </Form>
    );
  }
}

AppView.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  match: PropTypes.object,
};

export default AppView;

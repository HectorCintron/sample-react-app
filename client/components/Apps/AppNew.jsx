import React from 'react';
import { Button, Form, Input, TextArea, Loader, Dimmer, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { debounce } from 'lodash';
import 'whatwg-fetch';

class AppNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '' };
    this.state.loading = false;
    this.state.fieldErrors = [];
  }

  handleChange = (e, { name, value }) => {
    let key;
    if (name === 'title') {
      key = 1;
    } else if (name === 'description') {
      key = 2;
    }
    this.errorHandling(name, value, key);
    this.setState({ [name]: value });
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  }

  handleSubmit = (e) => {
    this.toggleLoading();
    const { title, description } = this.state;
    /* eslint-disable no-undef */
    fetch('/api/apps/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
    .then(res => res.json())
    .then((data) => {
      this.toggleLoading();
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

  errorHandling(name, value, key) {
    if (name === 'title' && value.length > 25 && !this.keyIn(key, this.state.fieldErrors)) {
      const errorArr = this.state.fieldErrors.slice();
      const errorMsg = 'title must be equal to or less than 25 characters';
      if (!errorArr.includes(errorMsg, 0)) {
        errorArr.push(
          {
            key,
            name,
            errorMsg,
          });
        this.setState({
          fieldErrors: errorArr,
        });
      }
    }
    if (name === 'title' && value.length <= 25 && this.keyIn(key, this.state.fieldErrors)) {
      this.setState({
        fieldErrors: [],
      });
    }
  }

  keyIn = (key, array) => {
    let bool = false;
    array.forEach((obj) => {
      if (obj.key === key) {
        bool = true;
      }
    });
    return bool;
  }

  render() {
    const { title, description, status, fieldErrors, loading } = this.state;
    const error = status === 'error';
    const success = status === 'success';
    const redirect = status === 'redirect' ? <Redirect to="/apps" /> : null;
    const fieldIssues = [];
    fieldErrors.forEach((err, index) => fieldIssues.push(
      <Message
        /* eslint-disable react/no-array-index-key */
        key={index}
        warning
        content={err.errorMsg}
      />,
    ));

    return (
      <Form
        size="large"
        key="large"
        success={success}
        warning={fieldErrors.length > 0}
        error={error}
        loading={loading}
        onSubmit={this.handleSubmit}
      >
        <Form.Field
          required
          value={title}
          control={Input}
          label="Title"
          name="title"
          placeholder="Title"
          onChange={this.handleChange}
        />
        <Form.Field
          required
          value={description}
          control={TextArea}
          label="Description"
          name="description"
          placeholder="Describe this application ..."
          onChange={this.handleChange}
        />
        <Form.Field
          disabled={fieldErrors.length > 0}
          control={Button}
          onSubmit={this.handleSubmit}
        >
        Submit
        </Form.Field>
        <Message
          error
          header="Action Forbidden"
          content="Error, please try again later."
        />
        <Message
          warning
          header="Form Field Errors"
        />
        {fieldIssues}
        <Message
          success
          header="Form Completed"
          content="Success"
        />
        {redirect}
      </Form>
    );
  }
}

export default AppNew;

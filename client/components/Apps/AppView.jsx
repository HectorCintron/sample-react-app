import React from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router';

function AppView(id, title, description) {
  return (
    <Form
      size="large"
      key="large"
    >
      <Form.Group widths="equal">
        <Form.Field
          required
          value={title}
          control={Input}
          label="Title"
          name="title"
          placeholder="Title"
        />
      </Form.Group>
      <Form.Field
        required
        value={description}
        control={TextArea}
        label="Description"
        name="description"
        placeholder="Describe this application ..."
      />
      <Link to="/apps/:id/edit">Edit</Link>
    </Form>
  );
}

export default AppView;

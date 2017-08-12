import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function myCardWrapper(WrappedComponent, data) {
  class CardWrap extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data,
      };
    }

    handleChange() {
      this.setState({
        data,
      });
    }

    render() {
      return (
        <Col id="card-wrapper" className="col-wrapper" xs={3}>
          <Row center="xs" className="card">
            <WrappedComponent data={this.state.data} {...this.props} />
          </Row>
        </Col>
      );
    }
  }
  CardWrap.displayName = `myCardWrapper(${getDisplayName(WrappedComponent)})`;
  return CardWrap;
}

export default myCardWrapper;

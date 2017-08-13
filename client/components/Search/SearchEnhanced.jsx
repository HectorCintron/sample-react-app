import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';
import { Col, Row } from 'react-flexbox-grid';
import './SearchEnhanced.scss';

/* eslint-disable */
class SearchEnhanced extends React.Component {
  render() {
    return (
      <Col xs={12} sm={6}>
        <Row between="xs">
          <Col xs={12} id="dropdown-wrapper" className="col-wrapper dropdown-wrapper">
            <Search id="search" showNoResults={false} onSearchChange={this.props.onSearchChange} value={this.props.value} />
          </Col>
        </Row>
      </Col>
    );
  }
}

SearchEnhanced.propTypes = {
  onSearchChange: PropTypes.func,
  value: PropTypes.string,
};

export default SearchEnhanced;

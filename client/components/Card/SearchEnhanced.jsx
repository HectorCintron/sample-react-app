import React from 'react';
import { Search } from 'semantic-ui-react';
import { Col, Row } from 'react-flexbox-grid';
import './SearchEnhanced.scss';

function SearchEnhanced() {
  return (
    <Col xs={12} sm={6}>
      <Row between="xs">
        <Col xs={12} id="dropdown-wrapper" className="col-wrapper dropdown-wrapper">
          <Search id="search" />
        </Col>
      </Row>
    </Col>
  );
}

export default SearchEnhanced;

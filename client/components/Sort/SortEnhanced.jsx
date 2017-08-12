import React from 'react';
// import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Col, Row } from 'react-flexbox-grid';
import './SortEnhanced.scss';

class SortEnhanced extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Col xs={12} sm={6}>
        <Row between="xs">
          <Col xs={12} id="dropdown-wrapper" className="col-wrapper dropdown-wrapper">
            <div id="sort-by">Sort by: </div>
            <div>
              <Dropdown
                scrolling
                placeholder={
                  this.props.selectedLabel ?
                  this.props.selectedLabel.text : 'Select'}
                options={[
                  { key: 1, text: 'Last Edit' },
                  { key: 2, text: 'Date' },
                  { key: 3, text: 'Name' },
                ]}
              />
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default SortEnhanced;

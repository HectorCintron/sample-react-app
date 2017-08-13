import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Col, Row } from 'react-flexbox-grid';
import './SortEnhanced.scss';

class SortEnhanced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.options = [
      { key: 1, value: 'lastEdit', text: 'Last Edit' },
      { key: 2, value: 'title', text: 'Title' },
    ];
  }

  render() {
    const { options } = this.state;
    return (
      <Col xs={12} sm={6}>
        <Row between="xs">
          <Col xs={12} id="dropdown-wrapper" className="col-wrapper dropdown-wrapper">
            <div id="sort-by">Sort by: </div>
            <div>
              <Dropdown
                scrolling
                placeholder="Select"
                onChange={this.props.onChange}
                options={options}
              />
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

SortEnhanced.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.array,
  /* eslint-disable */
  selectedLabel: PropTypes.object,
};

export default SortEnhanced;

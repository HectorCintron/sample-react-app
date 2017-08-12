import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row } from 'react-flexbox-grid';
import myCardWrapper from './CardWrapper';
import beaverFilled from '../../../assets/beaver-filled.png';
import deleteApp from '../../../assets/delete.png';
import downloadApp from '../../../assets/download.png';
import './Card.scss';

class NestedAppCard extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'AppCard';
    const { id, title, lastEdit, description } = this.props;
    this.data = `data: text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify({
      id,
      title,
      lastEdit,
      description,
    }))}`;
  }
  render() {
    const { id, title, lastEdit, onDelete } = this.props;
    return (
      <div className="app-card">
        <Link to={`/app/${id}`}>
          <img id="app-image" src={beaverFilled} alt="app" />
        </Link>
        <h2>{this.props.title} </h2>
        <h3>Last edit: {lastEdit}</h3>
        <Row center="xs">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              onDelete(this.props.id);
            }}
          >
            <img id="delete" src={deleteApp} alt="delete app" />
          </div>
          <div
            role="button"
            tabIndex={0}
          >
            <a
              href={this.data}
              download="data.json"
            >
              <img id="download" src={downloadApp} alt="download app" />
            </a>
          </div>
        </Row>
      </div>
    );
  }
}

NestedAppCard.propTypes = {
  id: PropTypes.string,
  lastEdit: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

const AppCard = myCardWrapper(NestedAppCard, 'data');
export default AppCard;

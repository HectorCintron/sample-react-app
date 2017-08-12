import React from 'react';
import { Link } from 'react-router-dom';
import plus from '../../../assets/plus.png';
import myCardWrapper from './CardWrapper';
import './Card.scss';

class NestedCreateCard extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'CreateCard';
  }

  render() {
    return (
      <div className="create-card">
        <div role="button" tabIndex="0">
          <Link to="/apps/new"><img id="plus" src={plus} alt="create" /></Link>
          <h2>Create new app</h2>
        </div>
      </div>
    );
  }
}
const CreateCard = myCardWrapper(NestedCreateCard, '');
export default CreateCard;


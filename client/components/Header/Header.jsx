import React from 'react';
import { Link } from 'react-router-dom';
import beaverLogo from '../../../assets/beaver-logo.png';
import settingsIcon from '../../../assets/settings-icon.png';
import './Header.scss';

function Settings() {
  return (
    <div className="Header">
      <Link to="/apps">
        <img id="beaver-logo" src={beaverLogo} alt="beaver logo" />
      </Link>
      <Link to="/settings">
        <img id="settings-icon" src={settingsIcon} alt="settings icon" />
      </Link>
    </div>
  );
}

export default Settings;

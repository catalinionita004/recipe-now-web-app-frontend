import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import './Timer.css';

const Timer = ({ minutes }) => {
    return (
        <div className="timer">
            <div className="timer-circle">
                <FontAwesomeIcon icon={faClock} className="timer-icon" />
                <span className="timer-minutes">{minutes}</span>
            </div>
        </div>
    );
};

export default Timer;

import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import './DateTimeDisplay.css';
const DateTimeDisplay = ({ date }) => {
    const formattedDate = moment(date).format('DD MMMM YYYY');
    const formattedTime = moment(date).format('HH:mm:ss');

    return (
        <div className="datetime-display">
            <div className="datetime-info">
                <div className="datetime-icon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
                <div>
                    <p className="datetime-label"></p>
                    <p className="datetime-value smaller-text">{formattedDate}</p>
                </div>
            </div>
            {/*<div className="datetime-info">*/}
            {/*    <div className="datetime-icon">*/}
            {/*        <FontAwesomeIcon icon={faClock} />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <p className="datetime-label"></p>*/}
            {/*        <p className="datetime-value smaller-text">{formattedTime}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default DateTimeDisplay;

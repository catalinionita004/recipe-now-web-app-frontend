import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

const MAX_STARS = 5;

function Rating({ averageRating, ratingCount }) {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating - fullStars >= 0.5;
    const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <FontAwesomeIcon
                key={i}
                icon={faStar}
                style={{ color: 'gold', cursor: 'pointer' }}
            />
        );
    }

    if (hasHalfStar) {
        stars.push(
            <FontAwesomeIcon
                key={fullStars}
                icon={faStarHalfAlt}
                style={{ color: 'gold', cursor: 'pointer' }}
            />
        );
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <FontAwesomeIcon
                key={fullStars + hasHalfStar + i}
                icon={faStarOutline}
                style={{ color: 'gray', cursor: 'pointer' }}
            />
        );
    }

    return (
        <div className="rating">
            {stars}
            <span className="average-rating">
        {' '}{averageRating.toFixed(2)}{' '}
                <span style={{ color: 'lightgray', fontSize: '0.9em' }}>({ratingCount})</span>
      </span>
        </div>
    );
}

export default Rating;

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import './ratingClass.css';

type Props = {
    ratingValue: number,
    ratingNumber: number,
    maxStarCount: number,
}

const RatingStars = ({ ratingValue, ratingNumber, maxStarCount }: Props) => {
    const filledStars = Math.floor(ratingValue);
    const halfStars = Math.round(ratingValue) - Math.floor(ratingValue);
    const emptyStars = 10 - (filledStars + halfStars);
    return (
        <span className={`starColor Color`}>
            {
                Array.from({ length: filledStars }).map(
                    (item, index) => (
                        <FontAwesomeIcon icon={faStar} key={index} />
                    )
                )
            }
            {
                Array.from({ length: halfStars }).map(
                    (item, index) => (
                        <FontAwesomeIcon icon={faStarHalf} key={index} />
                    )
                )
            }
            {
                Array.from({ length: emptyStars }).map(
                    (item, index) => (
                        <FontAwesomeIcon icon={faEmptyStar} key={index} />
                    )
                )
            }
            <div style={{ fontSize: "small" }}>
                {ratingValue}/{maxStarCount} ({ratingNumber} responses)
            </div>
        </span>
    )
}
export default RatingStars
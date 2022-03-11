import React from 'react';

export const Place = ({ place }) => {
    return (
        <div className="place">
            <div className="place_name_address">
                <p>{place.name}</p>
                <p>{place.address}</p>
            </div>
            <div className="place_rating">
                Rating:{' '}
                {place.rating ? <span>{place.rating} &#11088;</span> : 'N/A'}
            </div>
        </div>
    );
};

const PlacesList = ({ places, keyword, cityState }) => {
    return (
        <div id="places">
            {places && (
                <div id="places_summary">
                    Showing results for {keyword} in {cityState}.
                </div>
            )}
            {places &&
                places.map((place) => {
                    return <Place place={place} key={place.placeId} />;
                })}
        </div>
    );
};

export default PlacesList;

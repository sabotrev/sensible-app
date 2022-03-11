import React, { useContext } from 'react';
import { defaultLocations } from '../types/types';
import SearchContext from '../context/SearchContext';

const LocationSelect = () => {
    const context = useContext(SearchContext);
    const { setLocation } = context;

    return (
        <div id="location_select_container">
            <div>Select a Location</div>
            <ul
                onChange={(event) =>
                    setLocation(defaultLocations.get(parseInt(event.target.id)))
                }
            >
                {[...defaultLocations.values()].map((location) => {
                    return (
                        <li key={location.id}>
                            <input
                                type="radio"
                                name="location"
                                id={location.id}
                            />
                            {`${location.city}, ${location.state}`}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default LocationSelect;

import { useEffect, useState } from 'react';
import './NearbySearch/style/style.css';
import { initializeAPI, nearbySearch } from './NearbySearch/api/api';
import { useIsGoogleMapsLoaded } from './NearbySearch/hooks/useIsGoogleMapsLoaded';
import LocationSelect from './NearbySearch/components/LocationSelect';
import SearchContext from './NearbySearch/context/SearchContext';
import KeywordSearch from './NearbySearch/components/KeywordSearch';
import { errorInitialState } from './NearbySearch/types/types';
import PlacesList from './NearbySearch/components/PlacesList';
import { getSearchStatusText } from './NearbySearch/strings/strings';

function App() {
    const [location, setLocation] = useState();
    const [keyword, setKeyword] = useState('');
    const [cityState, setCityState] = useState();
    const [places, setPlaces] = useState();
    const [error, setError] = useState(errorInitialState);
    const [isSearching, setIsSearching] = useState(false);
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
    const [isWithAddresses, setIsWithAddresses] = useState(false);
    const googleMapsAPI = useIsGoogleMapsLoaded();

    useEffect(() => {
        if (googleMapsAPI) {
            initializeAPI(googleMapsAPI);
            setIsGoogleMapsLoaded(true);
        }
    }, [googleMapsAPI]);

    const search = async (newKeyword) => {
        setIsSearching(true);
        setError(errorInitialState);
        setKeyword(newKeyword);
        setCityState(`${location?.city}, ${location?.state}`);
        let results = await nearbySearch(isWithAddresses, location, newKeyword);

        if (results?.isError) {
            setError(results);
            setPlaces([]);
            setIsSearching(false);
            return;
        }
        console.table(results);
        setPlaces(results);
        setIsSearching(false);
    };

    const renderPlaces = () => {
        if (isSearching) {
            return <div>Searching...</div>;
        } else if (error?.isError) {
            return <div>{getSearchStatusText(error.status)}</div>;
        } else {
            return (
                <PlacesList
                    places={places}
                    keyword={keyword}
                    cityState={cityState}
                />
            );
        }
    };

    return (
        <div id="container">
            <SearchContext.Provider
                value={{
                    location,
                    setLocation,
                    isSearching,
                    search,
                    setIsWithAddresses,
                }}
            >
                {isGoogleMapsLoaded ? (
                    <>
                        <div id="search_container">
                            <LocationSelect />
                            <KeywordSearch />
                        </div>
                    </>
                ) : (
                    <div>...Loading</div>
                )}
                {renderPlaces()}
            </SearchContext.Provider>
            {/* Map is not used. */}
            <div id="map" />
        </div>
    );
}

export default App;

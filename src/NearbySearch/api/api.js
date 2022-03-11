let googleMapsWindowObject;
let map;
let service;

export const initializeAPI = (googleMapsAPI) => {
    googleMapsWindowObject = googleMapsAPI;
    map = new googleMapsAPI.Map(document.getElementById('map'));
    service = new googleMapsAPI.places.PlacesService(map);
};

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const split = (arr, size) => {
    const results = [];
    while (arr.length) {
        results.push(arr.splice(0, size));
    }
    return results;
};

const waitMS = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(time);
        }, time);
    });
};

const throttledPromises = (
    asyncFunction,
    items = [],
    batchSize = 5,
    delay = 2500
) => {
    return new Promise(async (resolve, reject) => {
        const output = [];
        const batches = split(items, batchSize);
        await asyncForEach(batches, async (batch) => {
            const promises = batch
                .map(asyncFunction)
                .map((p) => p.catch(reject));
            const results = await Promise.all(promises);
            output.push(...results);
            await waitMS(delay);
        });
        resolve(output);
    });
};

const getFormattedAddress = (placeResult) => {
    const placeId = placeResult.placeId;
    return new Promise((resolve, reject) => {
        const request = {
            placeId: placeId,
            fields: ['formatted_address'],
        };
        service.getDetails(request, (place, status) => {
            if (
                status === googleMapsWindowObject.places.PlacesServiceStatus.OK
            ) {
                placeResult.address = place.formatted_address;
                resolve(placeResult);
            } else {
                console.error(
                    'Error retrieving nearby search results, status: ',
                    status
                );
                reject({ isError: true, status: status });
            }
        });
    });
};

const getNearbyPlaces = (location, keyword) => {
    return new Promise((resolve, reject) => {
        const newLocation = new googleMapsWindowObject.LatLng(
            location.lat,
            location.long
        );

        const request = {
            location: newLocation,
            radius: '1500',
            type: [keyword],
        };

        service.nearbySearch(request, (results, status) => {
            if (
                status === googleMapsWindowObject.places.PlacesServiceStatus.OK
            ) {
                const trimmedResults = results.map((result) => {
                    return {
                        name: result.name,
                        rating: result.rating,
                        placeId: result.place_id,
                        address: result.vicinity,
                    };
                });
                resolve(trimmedResults);
            } else {
                console.error(
                    'Error retrieving nearby search results, status: ',
                    status
                );
                reject({ isError: true, status: status });
            }
        });
    });
};

export const nearbySearch = async (withPreciseAddress, location, keyword) => {
    console.log(
        `Searching location ${location.city}, ${location.state} for keyword: ${keyword}`
    );
    try {
        let places = await getNearbyPlaces(location, keyword);
        if (withPreciseAddress) {
            return await throttledPromises(getFormattedAddress, places);
        }
        return places;
    } catch (error) {
        return error;
    }
};

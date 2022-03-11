class Location {
    constructor(id, city, state, lat, long) {
        this.id = id;
        this.city = city;
        this.state = state;
        this.lat = lat;
        this.long = long;
    }
}

const defaultLocations = new Map([
    [1, new Location(1, 'Snowmass', 'CO', 39.213, -106.9378)],
    [2, new Location(2, 'Malibu', 'CA', 34.0259, -118.7798)],
    [3, new Location(3, 'Catskill', 'NY', 42.2146, -73.9595)],
    [4, new Location(4, 'Grand Teton National Park', 'WY', 43.7904, -110.6818)],
    [5, new Location(5, 'Columbia River Gorge', 'OR', 45.7253, -121.73)],
]);

const errorInitialState = {
    isError: false,
    status: null,
};

export { Location, defaultLocations, errorInitialState };

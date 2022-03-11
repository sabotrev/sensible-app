import { mount } from '@cypress/react';
import PlacesList, { Place } from '../PlacesList';

const mockPlaceWithoutRating = {
    name: 'Grand Teton National Park',
    placeId: 'ChIJqRtdyZ5RUlMRN6ORzI64oKU',
    address: 'WY',
};
const mockPlaces = [
    {
        name: 'Grand Teton National Park',
        rating: 4.8,
        placeId: 'ChIJqRtdyZ5RUlMRN6ORzI64oKU',
        address: 'WY',
    },
    {
        name: 'Mountain View Turnout',
        rating: 4.8,
        placeId: 'ChIJwettrWJRUlMRM7mNuJzZRvY',
        address: 'Moran',
    },
    {
        name: 'Grand Tetons National Park',
        rating: 5,
        placeId: 'ChIJOwf6iEoNUFMRJTKYn6P9RIk',
        address: 'Grand Teton Circle, Hoback Junction',
    },
];
const mockKeyword = 'hiking';
const mockCityState = 'Grand Teton National Park, WY';

describe('KeywordSearch component', () => {
    it('should not display anything if places is empty', () => {
        mount(
            <PlacesList
                places={undefined}
                keyword={mockKeyword}
                cityState={mockCityState}
            />
        );
        cy.get('#results_summary').should('not.exist');
        cy.get('.place').should('not.exist');
    });

    it('should display correct number of Places', () => {
        mount(
            <PlacesList
                places={mockPlaces}
                keyword={mockKeyword}
                cityState={mockCityState}
            />
        );
        cy.get('.place').its('length').should('eq', 3);
    });

    it('should display N/A for rating if undefined', () => {
        mount(<Place place={mockPlaceWithoutRating} />);
        cy.get('.place_rating').contains('N/A');
    });
});

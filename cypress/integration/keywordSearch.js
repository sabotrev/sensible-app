import React from 'react';
import { mount } from '@cypress/react';
import KeywordSearch from '../../src/NearbySearch/components/KeywordSearch';

describe('KeywordSearch component', () => {
    it('should disable search button on load', () => {
        mount(<KeywordSearch />);
        // console.log(cy.get('button').contains('Search'));
    });

    // it('should enable search button if text is not empty and location is selected', () => {});
});

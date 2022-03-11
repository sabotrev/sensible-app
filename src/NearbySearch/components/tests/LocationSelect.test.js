import { mount } from '@cypress/react';
import LocationSelect from '../LocationSelect';

describe('KeywordSearch component', () => {
    it('should display all locations on load', () => {
        mount(<LocationSelect />);
        cy.get('li').its('length').should('eq', 5);
    });
});

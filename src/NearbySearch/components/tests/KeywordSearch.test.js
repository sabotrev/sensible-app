import { mount } from '@cypress/react';
import KeywordSearch from '../KeywordSearch';
import SearchContext from '../../context/SearchContext';

describe('KeywordSearch component', () => {
    it('should disable search button on load', () => {
        mount(<KeywordSearch />);
        cy.get('button').should('be.disabled');
    });

    it('should enable search button if text is not empty and location is selected', () => {
        mount(
            <SearchContext.Provider value={{ location: cy.stub() }}>
                <KeywordSearch />
            </SearchContext.Provider>
        );
        cy.get('#keyword_input').type('hiking');
        cy.get('button').should('be.enabled');
    });
});

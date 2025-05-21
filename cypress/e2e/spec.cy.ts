describe('Bundesliga Tabelle', () => {
  beforeEach(() => {
    cy.intercept('GET', '/tabelle/**', { fixture: 'bl1_2024.json'})
  });

  it('shows team names from fixture', () => {
    cy.visit('/')
    cy.get('[data-cy="teamname"]').should('contain', 'FC Bayern München');
  });

  it('compares screenshots', () => {
    cy.visit('/');
    cy.compareSnapshot('body')
  });
})

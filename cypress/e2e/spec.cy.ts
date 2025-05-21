describe('Bundesliga Tabelle', () => {
  beforeEach(() => {
    cy.intercept('GET', '/tabelle/**', { fixture: 'bl1_2024.json'});
    cy.viewport(1000, 600);
  });

  it('shows team names from fixture', () => {
    cy.visit('/');
    cy.get('[data-cy="teamname"]').should('contain', 'FC Bayern München');
  });

  it('compares screenshots', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.compareSnapshot({
      name: 'body',
      testThreshold: 0.2,
      cypressScreenshotOptions: {
        clip: {
          x: 0,
          y: 0,
          width: 1000,
          height: 600
        }
      }
    });
  });
})

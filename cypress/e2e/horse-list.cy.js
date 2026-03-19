describe('Horse List', () => {
  it('loads and displays 20 horses', () => {
    cy.visit('/');

    cy.contains('Horse List (1-20)').should('be.visible');
    // Wait for fetch to complete and rows to render
    cy.get('.horse-list__body tbody tr', { timeout: 10000 }).should('have.length', 20);
    // Placeholder should not be visible once loaded
    cy.get('.horse-list__placeholder').should('not.exist');
  });
});

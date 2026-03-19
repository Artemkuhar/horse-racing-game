describe('Results Board', () => {
  it('accumulates round results during the race and finishes', () => {
    cy.visit('/');

    cy.contains('button', 'Generate').click();
    cy.contains('button', 'Start').click();

    // Ensure results board appears and starts filling
    cy.contains('Results').should('be.visible');
    cy.contains('Results')
      .parents('.board')
      .find('.board__round-card', { timeout: 30000 })
      .should('have.length.greaterThan', 0);

    // Eventually race finishes
    cy.contains('button', 'Finished', { timeout: 60000 }).should('be.visible');
  });
});

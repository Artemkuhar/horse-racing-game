describe('Program Board', () => {
  it('renders all rounds after generating program', () => {
    cy.visit('/');

    cy.contains('button', 'Generate').click();
    cy.contains('Program').should('be.visible');

    // Program board lists rounds with headers
    cy.contains('Program').parents('.board').find('.board__round-card').should('have.length', 6);
    cy.contains('Program')
      .parents('.board')
      .find('.board__round-title')
      .first()
      .contains('Round 1 -')
      .should('be.visible');
  });
});

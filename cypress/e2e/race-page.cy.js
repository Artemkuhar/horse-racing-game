describe('Race page', () => {
  it('generates a program and enables the start button', () => {
    cy.visit('/');

    cy.contains('Horse List (1-20)').should('be.visible');
    cy.get('.horse-list__body tbody tr').should('have.length.greaterThan', 1);

    cy.contains('button', 'Generate').should('not.be.disabled').click();

    cy.contains('Program').should('be.visible');
    cy.contains('Round 1 -').should('be.visible');

    cy.contains('button', 'Start').should('not.be.disabled');
  });

  it('starts, pauses, and resumes the race; verifies track lanes', () => {
    cy.visit('/');

    // Ensure schedule is generated first
    cy.contains('button', 'Generate').click();
    cy.contains('Program').should('be.visible');

    // Start -> label becomes Pause
    cy.contains('button', 'Start').click();
    cy.contains('button', 'Pause').should('be.visible');

    // Race Track shows Round 1 and 10 lanes
    cy.get('.race-track').should('be.visible');
    cy.get('.race-track__header').contains('Round 1 -').should('be.visible');
    cy.get('.race-track__lanes .race-track__lane').should('have.length', 10);

    // Pause -> label becomes Resume
    cy.contains('button', 'Pause').click();
    cy.contains('button', 'Resume').should('be.visible');

    // Resume -> label returns to Pause
    cy.contains('button', 'Resume').click();
    cy.contains('button', 'Pause').should('be.visible');
  });
});

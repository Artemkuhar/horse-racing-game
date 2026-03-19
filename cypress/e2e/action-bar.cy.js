describe('Action Bar controls', () => {
  it('enables Start only after Generate; handles regenerate dialog', () => {
    cy.visit('/');

    // Initial state
    cy.contains('button', 'Start').should('be.disabled');
    cy.contains('button', 'Generate').should('not.be.disabled');

    // Generate schedule
    cy.contains('button', 'Generate').click();
    cy.contains('Program').should('be.visible');
    cy.contains('button', 'Start').should('not.be.disabled');

    // Start race and open regenerate dialog
    cy.contains('button', 'Start').click();
    cy.contains('button', 'Pause').should('be.visible');

    cy.contains('button', 'Generate').click();
    cy.contains('Regenerate schedule?').should('be.visible');

    // Cancel -> dialog closes, race still running
    cy.get('.v-dialog--active').within(() => {
      cy.contains('button', 'Cancel').click();
    });
    cy.get('.v-dialog--active').should('not.exist');
    cy.contains('button', 'Pause').should('be.visible');

    // Confirm -> race stops and schedule regenerated
    cy.contains('button', 'Generate').click();
    cy.contains('Regenerate schedule?').should('be.visible');
    cy.contains('button', 'Regenerate').click();

    cy.contains('button', 'Start').should('not.be.disabled');
    // Results reset (ensure header is in viewport in CI)
    cy.contains('Results').scrollIntoView().should('be.visible');
    cy.contains('Results').parents('.board').find('.board__round-card').should('have.length', 0);
  });
});

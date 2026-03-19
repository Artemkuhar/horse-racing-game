describe('Race Track', () => {
  it('shows round header and 10 lanes after starting', () => {
    cy.visit('/');

    // Generate schedule
    cy.contains('button', 'Generate').click();
    cy.contains('Program').should('be.visible');

    // Start race
    cy.contains('button', 'Start').click();
    cy.contains('button', 'Pause').should('be.visible');

    // Track header shows Round 1 and lanes are rendered
    cy.get('.race-track').should('be.visible');
    cy.get('.race-track__header').contains('Round 1 -').should('be.visible');
    cy.get('.race-track__lanes .race-track__lane').should('have.length', 10);

    // Finish label appears when a round is ongoing
    cy.get('.race-track__finish-label').should('be.visible');
  });
});
describe('Race Track', () => {
  it('shows current round info and lanes for participants', () => {
    cy.visit('/');

    // Generate schedule to populate first round
    cy.contains('button', 'Generate').click();

    // Start race to set current round
    cy.contains('button', 'Start').click();
    cy.contains('button', 'Pause').should('be.visible');

    // Header shows Round 1
    cy.get('.race-track__header').contains('Round 1 -').should('be.visible');

    // Lanes equal to 10 participants
    cy.get('.race-track__lanes .race-track__lane').should('have.length', 10);
    // Finish markers visible
    cy.get('.race-track__finish').should('exist');
    cy.get('.race-track__finish-label').should('contain.text', 'Finish');
  });
});

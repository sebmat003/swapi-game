export const chooseProperty = (property = 'mass') => {
  cy.get('[data-cy="choose-property-select"]').click();
  cy.get('[data-cy="choose-property-option"]').contains(property).click();
}

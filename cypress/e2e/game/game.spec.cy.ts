import { chooseProperty } from "./utilities/choose-property.utilities";
import { clickPlay } from "./utilities/click-play.utilities";
import { createPerson } from "../../../src/app/game/testing/game-testing.data";

describe('Swapi Game', () => {
  beforeEach(() => {
    cy.visit('/game');
  });

  it('Should start game', () => {
    chooseProperty();
    clickPlay();

    cy.get('[data-cy="game-card"').should('have.length', 2).should('be.visible')
  });

  it('Should choose height option and play 2 times', () => {
    chooseProperty('height');

    Cypress._.times(2, () => {
      clickPlay();
    });
  });

  it('Should set second player as a winner', () => {
    let reqIndex = 0;
    const gameCard = '[data-cy="game-card"';
    const counterResult = '[data-cy="counter-result"]';
    chooseProperty();

    cy.intercept({ url: 'https://www.swapi.tech/api/people/*', times: 2}, req => {
      reqIndex += 1;
      req.reply({
        body: {
          result: {
            properties: { ...createPerson('name' + reqIndex), mass: 100 * reqIndex }
          }
        }
      });
    }).as('getPerson');

    clickPlay();
    cy.get(gameCard).first().should('not.have.class', 'winner');
    cy.get(gameCard).last().should('have.class', 'winner');
    cy.get(counterResult).first().should('have.text', 'Result: 0');
    cy.get(counterResult).last().should('have.text', 'Result: 1');
  });
});

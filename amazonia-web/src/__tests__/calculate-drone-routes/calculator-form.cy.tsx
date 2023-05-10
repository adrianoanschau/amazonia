import { CalculatorForm } from '../../calculate-drone-routes/calculator-form';

describe('<CalculatorForm />', () => {
  beforeEach(() => {
    cy.mount(<CalculatorForm />);
  });

  it('should render "Drone Start" input with your label', () => {
    cy.get('#drone-start label').should('have.text', 'Drone start');
    cy.get('#drone-start input').invoke('attr', 'type').should('eq', 'text');
  });

  it('should render "Object pick-up" input with your label', () => {
    cy.get('#object-pick-up label').should('have.text', 'Object pick-up');
    cy.get('#object-pick-up input').invoke('attr', 'type').should('eq', 'text');
  });

  it('should render "Delivery destination" input with your label', () => {
    cy.get('#delivery-destination label').should(
      'have.text',
      'Delivery destination',
    );

    cy.get('#delivery-destination input')
      .invoke('attr', 'type')
      .should('eq', 'text');
  });

  it('should render "Calculate fastest route" button', () => {
    cy.get('#calculate-fastest-route').should(
      'have.text',
      'Calculate fastest route!',
    );

    cy.get('#calculate-fastest-route')
      .invoke('attr', 'type')
      .should('eq', 'button');
  });
});

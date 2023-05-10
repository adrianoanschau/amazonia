import { AppInfo } from '../../app-info';
import apiInfoMock from '../../../cypress/fixtures/api-info.json';

describe('<AppInfo />', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api', { fixture: 'api-info.json' });
    cy.mount(<AppInfo />);
  });

  it('should render api info name and version', () => {
    cy.get('.MuiChip-root').should(
      'have.text',
      `${apiInfoMock.name} :: ${apiInfoMock.version}`,
    );
  });
});

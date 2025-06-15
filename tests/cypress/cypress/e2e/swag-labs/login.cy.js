describe('Swag Labs', () => {
  it('Login to the application', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').should('exist').type('standard_user')
    cy.get('#password').should('exist').type('secret_sauce')
    cy.get('#login-button').should('exist').should('have.value', 'Login').click()
  })
})
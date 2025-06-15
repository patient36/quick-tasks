describe('Task master auth', () => {
    it('Login - chage theme - change user name - logout', () => {
        // Login
        cy.visit('http://localhost:3000/')
        cy.get('#«r3»-form-item').should('exist').type("john@doe.co")
        cy.get('#«r4»-form-item').should('exist').type("mypasswordis1234")
        cy.get("[data-slot='button']").should('exist').click()

        // change theme
        cy.get("[data-slot='dropdown-menu-trigger']").click()
        cy.get("[role='menuitem']").should('exist').contains('Light').click()

        // change user name
        cy.get("[data-slot='avatar']").click()
        cy.get("[role='menuitem']").should('exist').contains('Settings').click()
        cy.get("[name='name']").should('exist').type('James Bond')
        cy.get("[data-slot='button']").should('exist').first().should('have.text','Update Name').click()

        // Logout
        cy.get("[data-slot='avatar']").click()
        cy.get("[role='menuitem']").should('exist').contains('Log out').click()

    })

    it('Register', () => {
        cy.visit('http://localhost:3000/')
        cy.get("#radix-«r0»-trigger-register").should('exist').click()
        cy.get('#«r5»-form-item').should('exist').type("John Doe")
        cy.get('#«r6»-form-item').should('exist').type("john@doe.co")
        cy.get('#«r7»-form-item').should('exist').type("mypasswordis1234")
        cy.get('#«r8»-form-item').should('exist').type("mypasswordis1234")
        cy.get("[data-slot='button']").should('exist').click()
    })

    it('Reset password', () => {
        cy.visit('http://localhost:3000/')
        cy.get("[href='/reset-password']").should('exist').should('contain', 'Forgot password?').click()
        cy.get('#email').should('exist').type("john@doe.co")
        cy.get("[data-slot='button']").should('exist').click()
        cy.get("#otp").should('exist').type("123456789012")
        cy.get("#email-confirm").should('exist').should('have.value', "john@doe.co")
        cy.get("#new-password").should('exist').type("mypasswordis1234")
        cy.get("#confirm-password").should('exist').type("mypasswordis1234")
        cy.get("[data-slot='button']").should('exist').click()
    })

})
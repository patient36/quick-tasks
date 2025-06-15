describe('Tasks master', () => {
    it('Tasks operations', () => {
        // Login
        cy.visit('http://localhost:3000/')
        cy.get('#«r3»-form-item').should('exist').type("john@doe.co")
        cy.get('#«r4»-form-item').should('exist').type("mypasswordis1234")
        cy.get("[data-slot='button']").should('exist').click()

        cy.url().should('include', '/dashboard');

        // get stats titles
        cy.get("[data-slot='card-title']").should('exist').should('have.length', 5).each(($el, index) => {
            const titles = ['Total Tasks', 'Pending', 'Completed', 'Overdue', 'Cancelled '];
            cy.wrap($el).should('have.text', titles[index]);
        })

        // switch tabs
        cy.get("[type='button'][role='tab']").should('exist').should('have.length', 5).each(($el, index) => {
            const titles = ['All Tasks', 'Pending', 'Completed', 'Overdue', 'Cancelled'];
            cy.wrap($el).should('have.text', titles[index]).click();
        })


        // create task
        cy.get("[data-slot='button']").should('exist').within(() => {
            cy.get('svg').should('exist')
        }).click();
        cy.get("[name='title']").should('exist').type('Test task');
        cy.get("textarea").should('exist').type('Test task description');
        cy.get("[type='button'][role='combobox']").should('exist').last().click();
        cy.contains('[role="option"]', 'HIGH').should('exist').click();
        cy.get("[data-slot='popover-trigger']").should('exist').click();
        cy.get("[name='next-month']").should('exist').click();
        cy.get("[name='day']").last().should('exist').click();
        cy.get("[data-slot='button'][type='button']").should('exist').and('contain.text', 'Cancel')
        cy.get("[data-slot='button'][type='submit']").should('exist').and('contain.text', 'Create Task').click();

        // get the first task and update it
        cy.get("[type='button'][role='tab']").should('exist').eq(1).click();
        cy.wait(1000);
        cy.get("[data-slot='card-content']").should('exist').last().should('contain.text', 'Test task').click();
        cy.get("[data-slot='button']").last().should('have.text', 'Edit Task').should('exist').click()

        // edit task
        cy.get("[name='title']").should('exist').clear().type('Test task updated');
        cy.get("textarea").should('exist').clear().type('Test task description updated');
        cy.get("[type='button'][role='combobox']").should('exist').last().click();
        cy.contains('[role="option"]', 'LOW').should('exist').click();
        cy.get("[data-slot='popover-trigger']").should('exist').click();
        cy.get("[name='next-month']").should('exist').click({ force: true });
        cy.get("[name='day']").eq(3).should('exist').click({ force: true });
        cy.get("[data-slot='button'][type='submit']").should('exist').and('contain.text', 'Save Changes').click();

        // get the first task and delete it
        cy.get("[type='button'][role='tab']").should('exist').eq(1).click();
        cy.get("[data-slot='card-content']").should('exist').last().should('contain.text', 'Test task').click();
        cy.get("[data-slot='dropdown-menu-trigger']").last().should('exist').click()
        cy.get("[data-slot='dropdown-menu-item']").last().should('exist').click()

        // // search task
        cy.get("[data-slot='input']").should('exist').type('Test task updated')
        cy.get("div.search-results").should('be.visible');
        cy.get("ul").should('be.visible').find("li").first().click();
        cy.get("[data-slot='button']").eq(1).should('have.text', 'Close').click();

        // Logout
        cy.get("[data-slot='avatar']").click()
        cy.get("[role='menuitem']").should('exist').contains('Log out').click()
        cy.reload();

    })
})
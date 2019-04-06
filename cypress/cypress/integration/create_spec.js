describe('Create votation Test', function() {
    beforeEach(function () {
        // login by request
        cy.request({
            method: 'POST',
            url: '/login', // baseUrl is prepended to url
            form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
              user_name: 'aldo',
              pass_word: 'aldo'
            }
        })
    })
    it('create a simple majority', function() {
        cy.visit("/votation_propose")
        const random_number = Math.trunc( Math.random() * 10000 ) 
        cy.get('#votation_description').type('cypress' + random_number)
        cy.get('#votation_type').select('simple_maj')
        cy.get('#begin_date').type('2019-04-01')
        cy.get('#begin_time').type('13:45')
        cy.get('#end_date').type('2019-04-02')
        cy.get('#end_time').type('14:45')
        cy.get('#votation_options').type("mare\nmonti\ncampagna")
        cy.get('button').click()
        cy.get('.alert-success').should('contain', 'Votazione salvata')
    })
    it('delete the simple maj', function() {
        cy.visit("/votation_list")
        cy.get('[data-cy=detail]').first().click()
        cy.get("[data-cy=delete_votation]").click()
        cy.get("[data-cy=confirm_delete]").click()
        cy.get('.alert-success').should('contain', 'Votazione cancellata')
    })



})

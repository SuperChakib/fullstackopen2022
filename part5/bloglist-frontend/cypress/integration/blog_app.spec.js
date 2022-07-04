describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'Chakib', password: 'Sala1ne!' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('html').should('contain', 'log in to application')
    cy.get('form')
      .should('contain', 'username')
      .and('contain', 'password')
      .contains('button', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#usernameInput').type('Chakib')
      cy.get('#passwordInput').type('Sala1ne!')
      cy.contains('button', 'login').click()

      cy.get('html').should('contain', 'Chakib logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#usernameInput').type('Chakib')
      cy.get('#passwordInput').type('wrong')
      cy.contains('button', 'login').click()

      cy.get('#error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Chakib logged-in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Chakib', password: 'Sala1ne!' })
    })

    it('A blog can be created', function () {
      cy.contains('button', 'create new blog').click()
      cy.get('#title-input').type('first blog')
      cy.get('#author-input').type('Chakib')
      cy.get('#url-input').type('chakib.first-blog.com')
      cy.get('form').contains('button', 'create').click()

      cy.get('.blogItem')
        .should('contain', 'first blog')
        .and('contain', 'Chakib')
      cy.get('.blogDetails')
        .should('contain', 'chakib.first-blog.com')
    })

    describe('and multiple blogs saved', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Chakib', url: 'chakib.first-blog.com' })
        cy.createBlog({ title: 'second blog', author: 'Chakib', url: 'chakib.second-blog.com' })
        cy.createBlog({ title: 'third blog', author: 'Chakib', url: 'chakib.third-blog.com' })
      })

      it('users can like a blog', function () {
        cy.contains('third blog').as('blogHeader')

        cy.get('@blogHeader')
          .find('button')
          .click()

        for (let i = 0; i < 3; i++) {
          cy.get('@blogHeader')
            .parent()
            .should('contain', `likes ${i}`)
            .contains('button', 'likes')
            .click()
        }
      })

      it('users can delete own blogs', function () {
        cy.contains('first blog').as('blogHeader')

        cy.get('@blogHeader')
          .find('button')
          .click()

        cy.get('@blogHeader')
          .parent()
          .contains('button', 'remove')
          .click()

        cy.get('html').should('not.contain', 'first blog')
      })

      it('users cannot delete other blogs', function () {
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'Matt', password: 'Sala1ne!' })
        cy.login({ username: 'Matt', password: 'Sala1ne!' })

        cy.contains('first blog').as('blogHeader')

        cy.get('@blogHeader')
          .find('button')
          .click()

        cy.get('@blogHeader')
          .parent()
          .contains('button', 'remove')
          .should('have.css', 'display', 'none')

        cy.get('html').should('contain', 'first blog')
      })
    })
  })
})
describe('The Home Page', function () {
  it('successfully loads', function () {
    cy.visit('http://localhost:3000/')
  })
  it('successfully loads the articles page', function () {
    cy.visit('http://localhost:3000/articles')
  })
  it('successfully gets all articles when on articles page', function () {
    cy.request('GET', 'http://localhost:3000/articles')
      .its('body')
      .as('currentUser')
  })
  it('finds the content "articles"', function () {
    cy.visit('http://localhost:3000/')
    cy.contains('Articles')
  })
  it('clicks the link "Topics"', function () {
    cy.visit('http://localhost:3000/')
    cy.contains('Topics').click()
  })
  it('clicks the link "Create Article"', function () {
    cy.visit('http://localhost:3000/articles')
    cy.contains('Create Article?').click()
    cy.url().should('include', 'newArticle')
  })
  it('clicks the drop down menu on articles page', function () {
    cy.visit('http://localhost:3000/articles')
    cy.get('.custom-select').select('article_id')
  })
  it('deletes a created article', function () {
    cy.server({
      method: 'DELETE',
      status: 200,
      response: {}
    })
    cy.route('/articles/82')
  })
  it('deletes a created comment', function () {
    cy.server({
      method: 'DELETE',
      status: 200,
      response: {}
    })
    cy.route('/articles/33/comments')
  })
});

describe('when the user is authorized', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[class*=login--login-module]').click()

    cy.get('form input').first().type('admin')
    cy.get('form input').last().type('admin')
    cy.get('form button').first().click()
    cy.get('button').contains('Додати').click()
  })

  afterEach(() => {
    // cleanTextData()
  })

  describe('when the user clicks on Add button', () => {
    it('should render aff new item form', () => {
      cy.get('label').contains('Назва').next('input').type('Нова тестова точка (cypress)')
      cy.get('label').contains('Координати').next('span').find('input').first().type('17')
      cy.get('label').contains('Координати').next('span').find('input').last().type('18')
      cy.get('label').contains('Опис').next('textarea').type('Опис для тестової точки')
      cy.get('button').contains('Додати').click()

      cy.contains('Успішно додано!')
    })
  })
})

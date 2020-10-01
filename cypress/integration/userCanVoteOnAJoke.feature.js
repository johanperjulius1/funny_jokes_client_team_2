describe("Authenticated user can vote on a Joke", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.visit("/");

    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type("user@mail.com");
      cy.get('[data-cy="password"]').type("password");
      cy.get('[data-cy="button"]').contains("Submit").click();
    });
    cy.get('[data-cy="message"]').should("contain", "Hi user@mail.com");
  });
  
  it('User can see the vote button', () => {
    cy.get('[data-cy="vote-button"]').should("exist");
  });

  describe("Authenticated user can vote on a Joke", () =>{
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/votes",
      response: "fixture:userCanVote.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.get('[data-cy="vote-button"]').click();
    cy.get('[data-cy="vote-message"]').should("contain", "Your vote has been submitted");
  });
});
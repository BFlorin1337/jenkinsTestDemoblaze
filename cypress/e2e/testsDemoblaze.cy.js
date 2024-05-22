const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const { addAllureReporter } = require("@shelex/cypress-allure-plugin/reporter");

describe("Automation tests for Demoblaze application (https://www.demoblaze.com/) with following scenarios:", () => {
  beforeEach(() => {
    cy.visit("https://demoblaze.com/");
    cy.allure().step("Visit Demoblaze website");
  });

  it("Users can successfully navigate among the application pages.", () => {
    cy.contains("Home").click();
    cy.url().should("include", "/index.html");
    cy.allure().step("Navigate to Home");

    cy.get("#navbarExample").contains("Contact").click().wait(1000);
    cy.visit("https://demoblaze.com/");
    cy.get(".modal-dialog").should("contain", "New message");
    cy.allure().step("Navigate to Contact");

    cy.get("#navbarExample").contains("About us").click().wait(1000);
    cy.visit("https://demoblaze.com/");
    cy.get(".modal-title").should("contain", "About us");
    cy.allure().step("Navigate to About us");

    cy.contains("Cart").click();
    cy.url().should("include", "/cart.html");
    cy.visit("https://demoblaze.com/");
    cy.allure().step("Navigate to Cart");

    cy.contains("Laptops").click();
    cy.get(".list-group").contains("Laptops");
    cy.get(".row").should("contain", "Sony vaio i5");
    cy.allure().step("Navigate to Laptops");

    cy.contains("Monitors").click();
    cy.get(".list-group").contains("Monitors");
    cy.get(".row").should("contain", "Apple monitor 24");
    cy.allure().step("Navigate to Monitors");

    cy.contains("Phones").click();
    cy.get(".list-group").contains("Phones");
    cy.get(".row").should("contain", "Samsung galaxy s6");
    cy.allure().step("Navigate to Phones");
  });

  it("Tests that a user can successfully add a product (of your choice) from the 'Laptops' category and place an order", () => {
    cy.visit("https://demoblaze.com/");
    cy.contains("Laptops").click();
    cy.get(".card-title").contains("MacBook air").click();
    cy.contains("Add to cart").click();
    cy.visit("https://demoblaze.com/cart.html");
    cy.contains("Place Order").click();
    cy.get("#name").type("Florin");
    cy.get("#country").type("Romania");
    cy.get("#city").type("Craiova");
    cy.get("#card").type("106649601359");
    cy.get("#month").type("05");
    cy.get("#year").type("2025");
    cy.contains("Purchase").click();
    cy.get(".sweet-alert").should("contain", "Thank you for your purchase!");
    cy.allure().step("Add a product to cart and place an order");
  });

  it("Tests that a user can successfully add multiple products from different categories and that they can successfully remove some of them from the cart before submitting the order", () => {
    cy.contains("Laptops").click();
    cy.get(".card-title").contains("Dell i7 8gb").click();
    cy.contains("Add to cart").click();
    cy.visit("https://demoblaze.com/");

    cy.contains("Phones ").click();
    cy.get(".card-title").contains("Nokia lumia 1520").click();
    cy.contains("Add to cart").click().wait(1000);
    cy.visit("https://demoblaze.com/");

    cy.contains("Monitors").click();
    cy.get(".card-title").contains("ASUS Full HD").click();
    cy.contains("Add to cart").click();
    cy.visit("https://demoblaze.com/");

    cy.visit("https://demoblaze.com/cart.html#").wait(2000);
    cy.get(".table-responsive").should("contain", "Nokia lumia 1520");
    cy.get(".table-responsive").contains("Nokia lumia 1520").parents("tr").contains("Delete").click().wait(1000).visit("https://demoblaze.com/cart.html#");
    cy.get(".table-responsive").should("not.contain", "Nokia lumia 1520");
    cy.allure().step("Add multiple products to cart and remove one before submitting the order");
  });

  it("Tests that a user can successfully send a message to Contact", () => {
    cy.get("#navbarExample").contains("Contact").click().wait(1000);
    cy.get("#recipient-email").type("bocseflorin@yahoo.com");
    cy.get("#recipient-name").type("Florin");
    cy.get("#message-text").type("Your site is amazing keep it up!");
    cy.contains("Send message").click();
    cy.allure().step("Send message to Contact");
  });
});

describe("Automated test scenarios for the sign up and log in functionalities.", () => {
  beforeEach(() => {
    cy.visit("https://demoblaze.com/");
    cy.allure().step("Visit Demoblaze website");
  });

  const name = "FlorinBocse123";
  const password = "12parola34";

  it("Tests the sign-up function.", () => {
    cy.get("#navbarExample").contains("Sign up").click().wait(1000);
    cy.get("#sign-username").type(name);
    cy.get("#sign-password").type(password);
    cy.get(".modal-footer").contains("Sign up").click().wait(1000);
    cy.allure().step("Sign up");
  });

  it("Tests the log-in function.", () => {
    cy.get("#navbarExample").contains("Log in").click().wait(1000);
    cy.get("#loginusername").type(name);
    cy.get("#loginpassword").type(password);
    cy.get(".modal-footer").contains("Log in").click().wait(1000);
    cy.get("#navbarExample").should("contain", "Welcome " + name);
    cy.allure().step("Log in");
  });
});

// Add Allure reporter
addAllureReporter(allureWriter);

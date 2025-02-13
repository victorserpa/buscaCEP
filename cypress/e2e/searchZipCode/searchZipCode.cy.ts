describe("Search Zip Code with Success", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://viacep.com.br/ws/89221005/json/", {
      statusCode: 200,
      body: {
        cep: "89221-005",
        logradouro: "Rua Teste",
        bairro: "Centro",
        localidade: "Joinville",
        uf: "SC",
      },
    }).as("getAddress");
  });

  it("Should search Zip Code and return success", () => {
    cy.intercept("POST", "/api/save-search", { statusCode: 200 }).as(
      "submitRequest"
    );

    cy.visit("/");

    cy.get("input[name='zipCode']").type("89221005");

    cy.wait("@getAddress");

    cy.get("input[name='street']").should("have.value", "Rua Teste");
    cy.get("input[name='complement']").type("123");
    cy.get("input[name='neighborhood']").should("have.value", "Centro");
    cy.get("input[name='city']").should("have.value", "Joinville");
    cy.get("input[name='state']").should("have.value", "SC");
    cy.get("button[type='submit']").click();

    cy.wait("@submitRequest");

    cy.get("body").within(() => {
      cy.get('[data-state="open"]')
        .should("exist")
        .and("contain.text", "Endereço salvo com sucesso");
    });
  });

  it("Should search Zip Code and try save the form but return error without complement", () => {
    cy.visit("/");
    cy.get("input[name='zipCode']").type("89221005");
    cy.wait("@getAddress");
    cy.wait(500);
    cy.get("button[type='submit']").click();
    cy.get("label[id='complement']")
      .contains("O Complemento é obrigatório")
      .should("be.visible");
  });

  it("Should be able to all fields filled in and clear all fields", () => {
    cy.visit("/");

    cy.get("input[name='zipCode']").type("89221005");

    cy.wait("@getAddress");

    cy.get("input[name='street']").should("have.value", "Rua Teste");
    cy.get("input[name='complement']").type("123");
    cy.get("input[name='neighborhood']").should("have.value", "Centro");
    cy.get("input[name='city']").should("have.value", "Joinville");
    cy.get("input[name='state']").should("have.value", "SC");
    cy.get("button[type='reset']").click();
  });
});

describe("Search Zip Code with many errors", () => {
  it("Should search Zip Code wrong and return error", () => {
    cy.intercept("GET", "https://viacep.com.br/ws/11111111/json/", {
      statusCode: 200,
      body: {
        erro: "true",
      },
    }).as("getAddress");
    cy.visit("/");

    cy.get("input[name='zipCode']").type("11111111");
    cy.wait("@getAddress");
    cy.wait(500);
    cy.get('li[datatype="error"]').within(() => {
      cy.contains("Tivemos um problema ao buscar o CEP").should("be.visible");
    });
  });

  it("Should return many errors if user try save without no field filled in", () => {
    cy.visit("/");
    cy.get("button[type='submit']").click();
    cy.wait(500);
    cy.get("label[id='zipCode']")
      .contains("Formato inválido")
      .should("be.visible");
    cy.get("label[id='street']")
      .contains("A Rua é obrigatória")
      .should("be.visible");
    cy.get("label[id='complement']")
      .contains("O Complemento é obrigatório")
      .should("be.visible");
    cy.get("label[id='neighborhood']")
      .contains("O bairro é obrigatório")
      .should("be.visible");
    cy.get("label[id='city']")
      .contains("A Cidade é obrigatória")
      .should("be.visible");
    cy.get("label[id='state']")
      .contains("O Estado é obrigatório")
      .should("be.visible");
  });
});

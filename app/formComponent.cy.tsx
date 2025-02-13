import FormSearchCep from "@/components/form";
import withQueryClient from "@/cypress/support/queryClient";

describe("Should be able save the form with success", () => {
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

  it("Should render and handle zip code search", () => {
    cy.mount(withQueryClient({ Component: <FormSearchCep /> }));

    cy.get("input[name='zipCode']").type("89221005");
    cy.wait("@getAddress");

    cy.get("input[name='street']").should("have.value", "Rua Teste");
    cy.get("input[name='complement']").type("123").should("have.value", "123");
    cy.wait(500);
    cy.get("form").submit();
    cy.get("input[name='complement']").should("have.value", "123");
    cy.get("input[name='neighborhood']").should("have.value", "Centro");
    cy.get("input[name='city']").should("have.value", "Joinville");
    cy.get("input[name='state']").should("have.value", "SC");

    cy.wait(500);
    cy.get("form").submit();
  });

  it("Should show validation error message for complement field", () => {
    cy.mount(withQueryClient({ Component: <FormSearchCep /> }));
    cy.get("input[name='zipCode']").type("89221005");
    cy.wait("@getAddress");
    cy.wait(500);
    cy.get("form").submit();

    cy.get("label[id='complement']").contains("O Complemento é obrigatório");
  });
});

describe("Should be able return errors", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://viacep.com.br/ws/11111111/json/", {
      statusCode: 200,
      body: {
        erro: "true",
      },
    }).as("getAddressWithErrors");
  });

  it("Should show validation error message for all fields", () => {
    cy.mount(withQueryClient({ Component: <FormSearchCep /> }));
    cy.wait(500);
    cy.get("form").submit();

    cy.get("label[id='zipCode']").contains("Formato inválido");
    cy.get("label[id='street']").contains("A Rua é obrigatória");
    cy.get("label[id='complement']").contains("O Complemento é obrigatório");
    cy.get("label[id='neighborhood']").contains("O bairro é obrigatório");
    cy.get("label[id='city']").contains("A Cidade é obrigatória");
    cy.get("label[id='state']").contains("O Estado é obrigatório");
  });

  it("Should show validation error message for a invalid zipCode", () => {
    cy.mount(withQueryClient({ Component: <FormSearchCep /> }));

    cy.get("input[name='zipCode']").type("11111111");
    cy.wait("@getAddressWithErrors");
    cy.wait(500);

    cy.get("label[id='zipCode']").contains("CEP inválido");
  });
});

import { test, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
// Mocka o módulo axios para evitar chamadas reais durante os testes
import { MemoryRouter } from "react-router";
// import userEvent from "@testing-library/user-event";
import axios from "axios";
import { HomePage } from "./HomePage.jsx";

vi.mock("axios");

describe("HomePage component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();
    // Mocka a resposta da API para retornar uma lista de produtos quando a HomePage fizer a requisição
    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return ({
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            }
          ],
        });
      }
    });
  });

  test("displays the products correctly", async () => {
	// Renderiza a HomePage dentro de um MemoryRouter para fornecer o contexto de roteamento necessário para o componente, 
	// já que a HomePage utiliza o hook useSearchParams do react-router para lidar com os parâmetros de busca na URL.
	render(
	  <MemoryRouter>
		<HomePage cart={[]} loadCart={loadCart} />
	  </MemoryRouter>,
	);

	// Aguarda até que os elementos com o teste ID "product-container" estejam presentes no DOM, 
	// indicando que os produtos foram carregados e renderizados corretamente.
	const productContasiners = await screen.findAllByTestId("product-container");
	expect(productContasiners.length).toBe(2);
	
	// Utiliza o método within para verificar se os detalhes de cada produto estão sendo renderizados 
	// corretamente dentro de seus respectivos contêineres, garantindo que as informações do produto estejam 
	// sendo exibidas conforme esperado.
	expect(within(productContasiners[0]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")).toBeInTheDocument();
	expect(within(productContasiners[0]).getByText("$10.90")).toBeInTheDocument();
	expect(within(productContasiners[1]).getByText("Intermediate Size Basketball")).toBeInTheDocument();
	expect(within(productContasiners[1]).getByText("$20.95")).toBeInTheDocument();
  });
});

import { test, expect, describe, vi } from "vitest";
import { Product } from "./Product.jsx";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import axios from "axios";
// Mocka o módulo axios para evitar chamadas reais durante os testes
vi.mock('axios');

describe("Product component", () => {
  test("renders product details correctly", () => {
    // constante para fornecer os dados do produto
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    //Cria um mock para a função loadCart, pois não podemos acessar o backend real durante o teste
    const loadCart = vi.fn();
    // Método render realiza o teste em um fake website
    render(<Product product={product} loadCart={loadCart} />);
    {
      /* Verifica se o nome do produto está sendo renderizado corretamente 
		Utilizando o método screen do vitest e o método toBeIntheDocument do Jest
		*/
    }
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();
    // testa se o preço do produto está sendo renderizado corretamente
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    // verifica se a imagem do produto está sendo renderizada corretamente
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    // verifica se a avaliação do produto está sendo renderizada corretamente
    expect(screen.getByTestId("product-rating-stars-img")).toHaveAttribute(
      "src",
      `images/ratings/rating-${product.rating.stars * 10}.png`,
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });
  // Testando a interação do botão "Add to Cart"
  test("calls loadCart function when 'Add to Cart' button is clicked", async () => {
    const product = {      
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    // Cria um mock para a função loadCart, pois não podemos acessar o backend real durante o teste
    const loadCart = vi.fn();

    //renderiza o componente Product com os dados do produto e a função loadCart mockada
    render(<Product product={product} loadCart={loadCart} />);

    // Simula o clique no botão "Add to Cart"
    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    // Verifica se a função axios.post foi chamada com os parâmetros corretos
    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items',
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
      }
    )
    
    // Verifica se a função loadCart foi chamada
    expect(loadCart).toHaveBeenCalled();
    })
});

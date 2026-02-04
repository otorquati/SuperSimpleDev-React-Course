import { test, expect, describe, vi } from "vitest";
import { Product } from "./Product.jsx";
import { render, screen } from "@testing-library/react";

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
});

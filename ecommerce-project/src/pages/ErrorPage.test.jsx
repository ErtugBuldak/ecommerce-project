import { it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ErrorPage from "./ErrorPage";

describe('ErrorPage component', () => {
  let cart;

  beforeEach(() => {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1"
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2"
      }
    ];
  });

  it('displays the error page correctly', () => {
    render(
      <MemoryRouter>
        <ErrorPage cart={cart} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('error-message')).toHaveTextContent('Page not found');
  })
})
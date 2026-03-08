import { it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CheckoutHeader from "./CheckoutHeader";

describe("CheckoutHeader component", () => {
  let cart;

  beforeEach(() => {
    cart = [
      {
        id: 1,
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
        createdAt: "2026-03-08T15:25:26.729Z",
        updatedAt: "2026-03-08T15:25:26.729Z",
      },
      {
        id: 2,
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
        createdAt: "2026-03-08T15:25:26.730Z",
        updatedAt: "2026-03-08T15:25:26.730Z",
      },
    ];
  });

  it("displays the checkout header correctly", () => {
    render(
      <MemoryRouter>
        <CheckoutHeader cart={cart} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("checkout-header-logo-link")).toHaveAttribute(
      "href",
      "/",
    );

    expect(screen.getByTestId("checkout-header-logo")).toHaveAttribute(
      "src",
      "/src/assets/images/logo.png",
    );

    expect(screen.getByTestId("checkout-header-mobile-logo")).toHaveAttribute(
      "src",
      "/src/assets/images/mobile-logo.png",
    );

    expect(screen.getByTestId("checkout-header-link")).toHaveAttribute(
      "href",
      "/",
    );

    expect(
      screen.getByTestId("checkout-header-middle-section"),
    ).toHaveTextContent("Checkout");
    expect(screen.getByTestId("checkout-header-link")).toHaveTextContent("3");

    expect(screen.getByTestId("checkout-lock-icon")).toHaveAttribute(
      "src",
      "/src/assets/images/icons/checkout-lock-icon.png",
    );
  });
});

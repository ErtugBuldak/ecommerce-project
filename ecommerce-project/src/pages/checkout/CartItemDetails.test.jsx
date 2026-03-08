import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";
import CartItemDetails from "./CartItemDetails";

vi.mock("axios");

describe("CartItemDetails component", () => {
  let cartItem;
  let loadCart;
  let user;

  beforeEach(() => {
    cartItem = {
      id: 1,
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
      createdAt: "2026-03-08T15:25:26.729Z",
      updatedAt: "2026-03-08T15:25:26.729Z",
      product: {
        keywords: ["socks", "sports", "apparel"],
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87,
        },
        priceCents: 1090,
        createdAt: "2026-03-08T15:25:26.729Z",
        updatedAt: "2026-03-08T15:25:26.729Z",
      },
    };

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it("displays cart item details correctly", () => {
    render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />);

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-name")).toHaveTextContent(
      "Black and Gray Athletic Cotton Socks - 6 Pairs",
    );

    expect(screen.getByTestId("product-price")).toHaveTextContent("$10.90");

    expect(screen.getByTestId("quantity-label")).toHaveTextContent("2");

    expect(screen.getByTestId("update-quantity-link")).toHaveTextContent(
      "Update",
    );

    expect(screen.getByTestId("delete-quantity-link")).toHaveTextContent(
      "Delete",
    );
  });

  it("removes an item from the cart", async () => {
    render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />);

    await user.click(screen.getByTestId("delete-quantity-link"));

    expect(axios.delete).toHaveBeenCalledWith(
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );

    expect(loadCart).toHaveBeenCalled();
  });

  it("updates an items quantity in the cart", async () => {
    render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />);

    const updateButton = screen.getByTestId("update-quantity-link");
    await user.click(updateButton);
    const inputField = screen.getByTestId("quantity-input");
    await user.clear(inputField);
    await user.type(inputField, "5");
    await user.click(updateButton);

    expect(axios.put).toHaveBeenCalledWith(
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      {
        quantity: 5,
      },
    );

    expect(loadCart).toHaveBeenCalled();
  });
});

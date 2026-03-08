import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import OrderSummary from "./OrderSummary";

describe("OrderSummary component", () => {
  let cart;
  let deiveryOptions;
  let loadCart;

  beforeEach(() => {
    cart = [
      {
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
      },
      {
        id: 2,
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
        createdAt: "2026-03-08T15:25:26.730Z",
        updatedAt: "2026-03-08T15:25:26.730Z",
        product: {
          keywords: ["sports", "basketballs"],
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: {
            stars: 4,
            count: 127,
          },
          priceCents: 2095,
          createdAt: "2026-03-08T15:25:26.730Z",
          updatedAt: "2026-03-08T15:25:26.730Z",
        },
      },
    ];

    deiveryOptions = [
      {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
        createdAt: "2026-03-08T15:25:26.729Z",
        updatedAt: "2026-03-08T15:25:26.729Z",
        estimatedDeliveryTimeMs: 1773605111306,
      },
      {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
        createdAt: "2026-03-08T15:25:26.730Z",
        updatedAt: "2026-03-08T15:25:26.730Z",
        estimatedDeliveryTimeMs: 1773259511306,
      },
      {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
        createdAt: "2026-03-08T15:25:26.731Z",
        updatedAt: "2026-03-08T15:25:26.731Z",
        estimatedDeliveryTimeMs: 1773086711306,
      },
    ];

    loadCart = vi.fn();
  });

  it("displays order summary correctly", () => {
    render(
      <OrderSummary
        cart={cart}
        deliveryOptions={deiveryOptions}
        loadCart={loadCart}
      />,
    );

    const cartItemContainers = screen.getAllByTestId("cart-item-container");

    expect(cartItemContainers.length).toBe(2);

    expect(
      within(cartItemContainers[0]).getByText("Sunday, March 15"),
    ).toBeInTheDocument();
    expect(
      within(cartItemContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();
    expect(
      within(cartItemContainers[0]).getAllByTestId("delivery-option-input")[0],
    ).toHaveAttribute("checked");

    expect(
      within(cartItemContainers[1]).getByText("Wednesday, March 11"),
    ).toBeInTheDocument();
    expect(
      within(cartItemContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
    expect(
      within(cartItemContainers[1]).getAllByTestId("delivery-option-input")[1],
    ).toHaveAttribute("checked");
  });
});

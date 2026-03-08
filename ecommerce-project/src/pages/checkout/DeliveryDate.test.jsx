import { it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DeliveryDate from "./DeliveryDate";

describe("DeliveryDate component", () => {
  let cartItem;
  let deliveryOptions;

  beforeEach(() => {
    cartItem = {
      id: 1,
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
      createdAt: "2026-03-08T15:25:26.729Z",
      updatedAt: "2026-03-08T15:25:26.729Z",
    };

    deliveryOptions = [
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
  });

  it("displays the delivery date correctly", () => {
    render(
      <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />,
    );

    expect(screen.getByTestId("delivery-date")).toHaveTextContent(
      "Sunday, March 15",
    );
  });
});

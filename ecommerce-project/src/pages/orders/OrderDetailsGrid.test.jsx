import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import OrderDetailsGrid from "./OrderDetailsGrid";

describe("OrderDetailsGrid component", () => {
  let order;
  let loadCart;

  beforeEach(() => {
    order = {
      id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
      orderTimeMs: 1723456800000,
      totalCostCents: 3506,
      products: [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          estimatedDeliveryTimeMs: 1723716000000,
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
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 2,
          estimatedDeliveryTimeMs: 1723456800000,
          product: {
            keywords: ["tshirts", "apparel", "mens"],
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
              stars: 4.5,
              count: 56,
            },
            priceCents: 799,
            createdAt: "2026-03-08T15:25:26.731Z",
            updatedAt: "2026-03-08T15:25:26.731Z",
          },
        },
      ],
      createdAt: "2026-03-08T15:25:26.729Z",
      updatedAt: "2026-03-08T15:25:26.729Z",
    };

    loadCart = vi.fn();
  });

  it("displays products in the order correctly", () => {
    render(
      <MemoryRouter>
        <OrderDetailsGrid order={order} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const images = screen.getAllByTestId("product-image");
    const names = screen.getAllByTestId("product-name");
    const dates = screen.getAllByTestId("product-delivery-date");
    const quantities = screen.getAllByTestId("product-quantity");

    expect(images[0]).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );
    expect(names[0]).toHaveTextContent(
      "Black and Gray Athletic Cotton Socks - 6 Pairs",
    );
    expect(dates[0]).toHaveTextContent("August 15");
    expect(quantities[0]).toHaveTextContent("1");

    expect(images[1]).toHaveAttribute(
      "src",
      "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    );
    expect(names[1]).toHaveTextContent("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(dates[1]).toHaveTextContent("August 12");
    expect(quantities[1]).toHaveTextContent("2");

    expect(screen.getAllByTestId("buy-again-icon")[0]).toHaveAttribute(
      "src",
      "/src/assets/images/icons/buy-again.png",
    );
  });
});

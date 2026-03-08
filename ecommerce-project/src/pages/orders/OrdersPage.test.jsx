import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import OrdersPage from "./OrdersPage";

vi.mock("axios");

describe("OrdersPage component", () => {
  let cart;
  let loadCart;
  let user;

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

    loadCart = vi.fn();

    user = userEvent.setup();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/orders?expand=products") {
        return {
          data: [
            {
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
                    rating: { stars: 4.5, count: 87 },
                    priceCents: 1090,
                    createdAt: "2026-03-08T15:25:26.729Z",
                    updatedAt: "2026-03-08T15:25:26.729Z",
                  },
                },
              ],
              createdAt: "2026-03-08T15:25:26.729Z",
              updatedAt: "2026-03-08T15:25:26.729Z",
            },
            {
              id: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
              orderTimeMs: 1718013600000,
              totalCostCents: 4190,
              products: [
                {
                  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                  quantity: 2,
                  estimatedDeliveryTimeMs: 1718618400000,
                  product: {
                    keywords: ["sports", "basketballs"],
                    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    image:
                      "images/products/intermediate-composite-basketball.jpg",
                    name: "Intermediate Size Basketball",
                    rating: { stars: 4, count: 127 },
                    priceCents: 2095,
                    createdAt: "2026-03-08T15:25:26.730Z",
                    updatedAt: "2026-03-08T15:25:26.730Z",
                  },
                },
              ],
              createdAt: "2026-03-08T15:25:26.730Z",
              updatedAt: "2026-03-08T15:25:26.730Z",
            },
          ],
        };
      }
    });
  });

  it("displays orders correctly", async () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Your Orders")).toBeInTheDocument();

    const orderContainers = await screen.findAllByTestId("order-container");
    expect(orderContainers.length).toBe(2);

    expect(
      within(orderContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();
    expect(
      within(orderContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
  });

  it("adds a product back to the cart", async () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const orderContainers = await screen.findAllByTestId("order-container");

    await user.click(
      within(orderContainers[0]).getByTestId("buy-again-button"),
    );
    await user.click(
      within(orderContainers[1]).getByTestId("buy-again-button"),
    );

    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalledTimes(2);
  });

  it("tracks an order", async () => {
    function Location() {
      const location = useLocation();

      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <Location />
        <OrdersPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const orderContainers = await screen.findAllByTestId("order-container");

    await user.click(
      within(orderContainers[0]).getByTestId("track-package-button"),
    );

    expect(screen.getByTestId("url-path")).toHaveTextContent(
      "/tracking/27cba69d-4c3d-4098-b42d-ac7fa62b7664/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );

    await user.click(
      within(orderContainers[1]).getByTestId("track-package-button"),
    );

    expect(screen.getByTestId("url-path")).toHaveTextContent(
      "/tracking/b6b6c212-d30e-4d4a-805d-90b52ce6b37d/15b6fc6f-327a-4ec4-896f-486349e85a3d",
    );
  });
});

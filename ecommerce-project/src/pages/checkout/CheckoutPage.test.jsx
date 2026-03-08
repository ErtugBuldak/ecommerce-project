import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import CheckoutPage from "./CheckoutPage";

vi.mock("axios");

describe("CheckoutPage component", () => {
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

    loadCart = vi.fn();

    user = userEvent.setup();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/delivery-options?expand=estimatedDeliveryTime") {
        return {
          data: [
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
          ],
        };
      } else if (urlPath === "/api/payment-summary") {
        return {
          data: {
            totalItems: 23,
            productCostCents: 34247,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 34746,
            taxCents: 3475,
            totalCostCents: 38221,
          },
        };
      }
    });
  });

  it("displays the checkout page correctly", async () => {
    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const cartItemContainers = await screen.findAllByTestId(
      "cart-item-container",
    );

    expect(cartItemContainers.length).toBe(2);

    expect(
      within(cartItemContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();

    expect(
      within(cartItemContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary")).getByText(
        "Payment Summary",
      ),
    ).toBeInTheDocument();
  });

  it("removes items from the cart", async () => {
    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const cartItemContainers = await screen.findAllByTestId(
      "cart-item-container",
    );

    await user.click(
      within(cartItemContainers[0]).getByTestId("delete-quantity-link"),
    );
    await user.click(
      within(cartItemContainers[1]).getByTestId("delete-quantity-link"),
    );

    expect(axios.delete).toHaveBeenNthCalledWith(
      1,
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );

    expect(axios.delete).toHaveBeenNthCalledWith(
      2,
      "/api/cart-items/15b6fc6f-327a-4ec4-896f-486349e85a3d",
    );

    expect(loadCart).toHaveBeenCalledTimes(2);
  });

  it("updates item quantities in the cart", async () => {
    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const cartItemContainers = await screen.findAllByTestId(
      "cart-item-container",
    );

    let updateButton = within(cartItemContainers[0]).getByTestId(
      "update-quantity-link",
    );
    await user.click(updateButton);
    let inputField = within(cartItemContainers[0]).getByTestId(
      "quantity-input",
    );
    await user.clear(inputField);
    await user.type(inputField, "5");
    await user.click(updateButton);

    updateButton = within(cartItemContainers[1]).getByTestId(
      "update-quantity-link",
    );
    await user.click(updateButton);
    inputField = within(cartItemContainers[1]).getByTestId("quantity-input");
    await user.clear(inputField);
    await user.type(inputField, "10");
    await user.click(updateButton);

    expect(axios.put).toHaveBeenNthCalledWith(
      1,
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      {
        quantity: 5,
      },
    );

    expect(axios.put).toHaveBeenNthCalledWith(
      2,
      "/api/cart-items/15b6fc6f-327a-4ec4-896f-486349e85a3d",
      {
        quantity: 10,
      },
    );

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});

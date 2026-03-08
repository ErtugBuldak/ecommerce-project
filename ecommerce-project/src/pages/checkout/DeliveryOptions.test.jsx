import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";
import DeliveryOptions from "./DeliveryOptions";

vi.mock("axios");

describe("DeliveryOptions component", () => {
  let deliveryOptions;
  let cartItem;
  let loadCart;
  let user;

  beforeEach(() => {
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

    cartItem = {
      id: 1,
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
      createdAt: "2026-03-08T15:25:26.729Z",
      updatedAt: "2026-03-08T15:25:26.729Z",
    };

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it("displays delivery options correctly", () => {
    render(
      <DeliveryOptions
        deliveryOptions={deliveryOptions}
        cartItem={cartItem}
        loadCart={loadCart}
      />,
    );

    expect(screen.getByTestId("delivery-options-title")).toHaveTextContent(
      "Choose a delivery option:",
    );

    const deliveryOptionElems = screen.getAllByTestId("delivery-option");

    expect(
      within(deliveryOptionElems[0]).getByTestId("delivery-option-input"),
    ).toHaveAttribute("checked");
    expect(
      within(deliveryOptionElems[0]).getByTestId("delivery-option-date"),
    ).toHaveTextContent("Sunday, March 15");
    expect(
      within(deliveryOptionElems[0]).getByTestId("delivery-option-price"),
    ).toHaveTextContent("FREE");

    expect(
      within(deliveryOptionElems[1]).getByTestId("delivery-option-input"),
    ).not.toHaveAttribute("checked");
    expect(
      within(deliveryOptionElems[1]).getByTestId("delivery-option-date"),
    ).toHaveTextContent("Wednesday, March 11");
    expect(
      within(deliveryOptionElems[1]).getByTestId("delivery-option-price"),
    ).toHaveTextContent("$4.99");

    expect(
      within(deliveryOptionElems[2]).getByTestId("delivery-option-input"),
    ).not.toHaveAttribute("checked");
    expect(
      within(deliveryOptionElems[2]).getByTestId("delivery-option-date"),
    ).toHaveTextContent("Monday, March 9");
    expect(
      within(deliveryOptionElems[2]).getByTestId("delivery-option-price"),
    ).toHaveTextContent("$9.99");
  });

  it("updates the delivery date selection", async () => {
    render(
      <DeliveryOptions
        deliveryOptions={deliveryOptions}
        cartItem={cartItem}
        loadCart={loadCart}
      />,
    );

    const deliveryOptionElems = screen.getAllByTestId("delivery-option");

    await user.click(
      within(deliveryOptionElems[1]).getByTestId("delivery-option-input"),
    );
    await user.click(
      within(deliveryOptionElems[2]).getByTestId("delivery-option-input"),
    );

    expect(axios.put).toHaveBeenNthCalledWith(
      1,
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      {
        deliveryOptionId: "2",
      },
    );

    expect(axios.put).toHaveBeenNthCalledWith(
      2,
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      {
        deliveryOptionId: "3",
      },
    );

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});

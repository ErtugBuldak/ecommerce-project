import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import PaymentSummary from "./PaymentSummary";

vi.mock("axios");

describe("PaymentSummary component", () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 23,
      productCostCents: 34247,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 34746,
      taxCents: 3475,
      totalCostCents: 38221,
    };

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it("displays the payment summary correctly", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const firstPaymentRow = screen.getByTestId("payment-summary-row-raw");
    
    expect(firstPaymentRow).toHaveTextContent("23");
    expect(within(firstPaymentRow).getByText("$342.47")).toBeInTheDocument();

    expect(screen.getByTestId("payment-summary-row-shipping")).toHaveTextContent("$4.99");

    expect(screen.getByTestId("payment-summary-row-before-tax")).toHaveTextContent("$347.46");

    expect(screen.getByTestId("payment-summary-row-tax")).toHaveTextContent("$34.75");

    expect(screen.getByTestId("payment-summary-row-total")).toHaveTextContent("$382.21");
  });

  it("places an order", async () => {
    function Location(){
      const location = useLocation();

      return(
        <div data-testid="url-path">{location.pathname}</div>
      )
    }

    render(
      <MemoryRouter>
        <Location />
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );

    await user.click(screen.getByTestId("place-order-button"));

    expect(axios.post).toHaveBeenCalledWith("/api/orders");

    expect(loadCart).toHaveBeenCalled();

    expect(screen.getByTestId("url-path")).toHaveTextContent('/orders');
  })
});

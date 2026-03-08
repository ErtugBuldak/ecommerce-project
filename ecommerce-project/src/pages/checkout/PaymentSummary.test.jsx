import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PaymentSummary from "./PaymentSummary";

describe("PaymentSummary component", () => {
  let paymentSummary;
  let loadCart;

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
});

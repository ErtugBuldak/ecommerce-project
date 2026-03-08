import { it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderHeader from "./OrderHeader";

describe("OrderHeader component", () => {
  let order;

  beforeEach(() => {
    order = {
      id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
      orderTimeMs: 1723456800000,
      totalCostCents: 3506,
    };
  });

  it("displays general order information correctly", () => {
    render(<OrderHeader order={order} />);

    expect(screen.getByTestId('order-date')).toHaveTextContent('August 12');

    expect(screen.getByTestId('order-total')).toHaveTextContent('$35.06');

    expect(screen.getByTestId('order-id')).toHaveTextContent('27cba69d-4c3d-4098-b42d-ac7fa62b7664');
  });
});

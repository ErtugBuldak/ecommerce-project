import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import TrackingPage from "./TrackingPage";

vi.mock("axios");

describe("TrackingPage component", () => {
  let cart;
  let user;

  beforeEach(() => {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];

    user = userEvent.setup();

    axios.get.mockImplementation(async () => {
      return {
        data: {
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
      };
    });
  });

  it('displays the tracking page properly', async () => {
    render(
      <MemoryRouter initialEntries={['/tracking/27cba69d-4c3d-4098-b42d-ac7fa62b7664/e43638ce-6aa0-4b85-b27f-e1d07eb678c6']}>
        <Routes>
          <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(await screen.findByTestId('delivery-date')).toHaveTextContent('Thursday, August 15');
    
    expect(screen.getByTestId('product-name')).toHaveTextContent('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(screen.getByTestId('product-quantity')).toHaveTextContent('1');

    expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

    expect(screen.getByTestId('progress-labels-container')).toBeInTheDocument();
  });

  it('returns back to the order page', async () => {
    function Location() {
      const location = useLocation();

      return (
        <div data-testid="url-path">{location.pathname}</div>
      )
    }

    render(
      <MemoryRouter initialEntries={['/tracking/27cba69d-4c3d-4098-b42d-ac7fa62b7664/e43638ce-6aa0-4b85-b27f-e1d07eb678c6']}>
        <Location></Location>
        <Routes>
          <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
          <Route path="/orders" element={null} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(await screen.findByTestId('back-to-orders-link'));

    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  })
});

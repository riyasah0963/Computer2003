import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Order } from '../types';

export function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order as Order;

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-8">We couldn't find the order details.</p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for shopping with FreshMart</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Order Number:</span><br />
                {order.id}
              </p>
              <p>
                <span className="font-medium">Tracking Code:</span><br />
                {order.trackingCode}
              </p>
              <p>
                <span className="font-medium">Expected Delivery:</span><br />
                {order.deliveryTime}
              </p>
              <p>
                <span className="font-medium">Total Amount:</span><br />
                £{order.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <p className="text-gray-600">
              {order.address.street}<br />
              {order.address.city}, {order.address.state} {order.address.zipCode}
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
            <p className="text-gray-600">
              {order.paymentMethod === 'credit_card' && 'Credit Card'}
              {order.paymentMethod === 'debit_card' && 'Debit Card'}
              {order.paymentMethod === 'paypal' && 'PayPal'}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span>£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
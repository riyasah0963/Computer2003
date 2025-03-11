import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, LogOut } from 'lucide-react';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-6 h-6" />
          Order History
        </h2>
        
        {user.orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {user.orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">£{order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{order.status}</span>
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-2">Delivery Details</h3>
                  <p className="text-sm text-gray-600">
                    Recipient: {order.address.recipientName}<br />
                    Mobile: {order.address.mobileNumber}<br />
                    Address: {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipCode}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium mb-2">Items</h3>
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t text-sm">
                  <p><span className="font-medium">Payment Method:</span> {' '}
                    {order.paymentMethod === 'credit_card' && 'Credit Card'}
                    {order.paymentMethod === 'debit_card' && 'Debit Card'}
                    {order.paymentMethod === 'paypal' && 'PayPal'}
                    {order.paymentMethod === 'cod' && 'Cash on Delivery'}
                  </p>
                  <p><span className="font-medium">Tracking Code:</span> {order.trackingCode}</p>
                  <p><span className="font-medium">Expected Delivery:</span> {order.deliveryTime}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
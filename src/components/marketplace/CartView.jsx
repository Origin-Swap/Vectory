const CartView = ({ cart }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="border-b pb-2">
              <div className="flex justify-between items-center">
              <div className="h-16 w-16 bg-gray-100 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg shadow"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.price} USDC</p>
                </div>
                <button className="text-red-500 hover:text-red-600">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartView;

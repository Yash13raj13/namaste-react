const Grocery = () => {
  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold">Grocery Store</h1>

      <p className="text-gray-600">
        Welcome to our online grocery store. Browse fresh products and daily
        essentials.
      </p>

      {/* Future child components will go here */}
      <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow">
        <p className="text-gray-500">
          🛒 Grocery items will be displayed here...
        </p>
      </div>
    </div>
  );
};

export default Grocery;

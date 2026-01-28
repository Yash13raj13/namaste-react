const Shimmer = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-64 h-80 bg-gray-300 rounded-xl shadow-md"
        />
      ))}
    </div>
  );
};

export default Shimmer;

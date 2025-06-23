const FeatureCard = ({ icon, title }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-3 hover:shadow-md transition-shadow max-w-xs w-full flex flex-col items-center justify-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    </div>
  );
};

export default FeatureCard;

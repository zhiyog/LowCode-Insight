const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;

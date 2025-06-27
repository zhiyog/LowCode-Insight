import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ChartCard = ({ 
  title, 
  subtitle,
  icon,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  onClick,
  hoverable = true,
  bordered = true,
  shadow = true,
  padding = true
}) => {
  const { theme } = useTheme();
  
  const cardClasses = `
    ${className}
    ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
    ${bordered ? theme === 'dark' ? 'border border-gray-700' : 'border border-gray-200' : ''}
    ${shadow ? theme === 'dark' ? 'shadow-md shadow-gray-900/20' : 'shadow-md shadow-gray-200/50' : ''}
    ${padding ? 'p-4' : ''}
    ${hoverable ? 'transition-all duration-300 hover:shadow-lg' : ''}
    rounded-lg
    overflow-hidden
  `;
  
  const headerClasses = `
    ${headerClassName}
    flex items-center justify-between
    ${padding ? 'mb-4' : ''}
  `;
  
  const bodyClasses = `
    ${bodyClassName}
  `;

  return (
    <motion.div 
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverable ? { y: -5 } : {}}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {(title || subtitle || icon) && (
        <div className={headerClasses}>
          <div>
            {title && <h3 className="font-medium text-lg">{title}</h3>}
            {subtitle && <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>}
          </div>
          {icon && <div className="text-xl">{icon}</div>}
        </div>
      )}
      
      <div className={bodyClasses}>
        {children}
      </div>
    </motion.div>
  );
};

export default ChartCard;

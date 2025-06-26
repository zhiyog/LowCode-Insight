import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ 
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
  padding = true,
  theme = 'dark'
}) => {
  const cardClasses = `
    ${className}
    ${theme === 'dark' ? 'bg-gray-800/90 text-white backdrop-blur-sm' : 'bg-white/90 text-gray-800 backdrop-blur-sm'}
    ${bordered ? theme === 'dark' ? 'border border-gray-700/50' : 'border border-gray-200/50' : ''}
    ${shadow ? theme === 'dark' ? 'shadow-md shadow-indigo-900/10' : 'shadow-md shadow-indigo-200/30' : ''}
    ${padding ? 'p-3' : ''}
    ${hoverable ? 'transition-all duration-300 hover:shadow-lg' : ''}
    rounded-xl
    overflow-hidden
  `;
  
  const headerClasses = `
    ${headerClassName}
    flex items-center justify-between
    ${padding ? 'mb-2' : ''}
  `;
  
  const bodyClasses = `
    ${bodyClassName}
    relative
  `;

  return (
    <motion.div 
      className={cardClasses}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={hoverable ? { y: -3, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* 装饰元素 */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-bl-full -z-10" />
      
      {(title || subtitle || icon) && (
        <div className={headerClasses}>
          <div>
            {title && (
              <h3 className="font-medium text-sm">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  {title}
                </span>
              </h3>
            )}
            {subtitle && <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>}
          </div>
          {icon && <div className="text-lg text-indigo-500">{icon}</div>}
        </div>
      )}
      
      <div className={bodyClasses}>
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardCard;

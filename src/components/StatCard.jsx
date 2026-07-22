import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import './StatCard.css';

export default function StatCard({
  icon,
  label,
  title,
  value,
  suffix = '',
  unit = '',
  prefix = '',
  change,
  trend,
  changeType = 'up',
  delay = 0,
  decimals = 0,
  glowColor
}) {
  const displayLabel = label || title || '';
  const displaySuffix = suffix || (unit ? ` ${unit}` : '');
  const displayChange = change || (typeof trend === 'number' ? `${trend > 0 ? '+' : ''}${trend}%` : null);
  const isUp = changeType === 'up' || (typeof trend === 'number' && trend >= 0);

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    if (typeof icon === 'function' || (typeof icon === 'object' && icon.$$typeof)) {
      const IconComp = icon;
      return <IconComp size={20} />;
    }
    return icon;
  };

  return (
    <motion.div
      className="stat-card glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={glowColor ? { '--glow': glowColor } : {}}
    >
      <div className="stat-card__header">
        <div className="stat-card__icon">{renderIcon()}</div>
        {displayChange && (
          <span className={`badge badge-${isUp ? 'success' : 'error'}`}>
            {isUp ? '↑' : '↓'} {displayChange}
          </span>
        )}
      </div>
      <div className="stat-card__value">
        <AnimatedCounter value={value} prefix={prefix} suffix={displaySuffix} decimals={decimals} />
      </div>
      <div className="stat-card__label">{displayLabel}</div>
    </motion.div>
  );
}

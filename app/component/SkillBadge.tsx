import React from 'react';

interface SkillBadgeProps {
  name: string;
  icon?: string;
  variant?: 'default' | 'secondary' | 'outline';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function SkillBadge({ name, icon, variant = 'default', onMouseEnter, onMouseLeave }: SkillBadgeProps) {
  const variantStyles = {
    default: 'bg-slate-800/80 text-slate-100 border-slate-700/50 hover:bg-slate-700/80 hover:border-slate-600',
    secondary: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20 hover:border-yellow-400/50',
    outline: 'bg-transparent text-slate-300 border-slate-600 hover:bg-slate-800/50 hover:text-slate-100'
  };

  const isUrl = icon?.startsWith('http') || icon?.startsWith('/');

  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-full 
      border backdrop-blur-sm
      transition-all duration-300 ease-out
      cursor-default
      shadow-lg hover:shadow-xl
      hover:scale-105 hover:-translate-y-0.5
      ${variantStyles[variant]}
    `}>
      {icon && (
        <span className="flex items-center justify-center">
          {isUrl ? (
             <img src={icon} alt={name} className="w-5 h-5 object-contain" />
          ) : (
            <span className="text-lg" role="img" aria-label={name}>
              {icon}
            </span>
          )}
        </span>
      )}
      <span className="font-medium text-sm tracking-wide">
        {name}
      </span>
    </div>
  );
}

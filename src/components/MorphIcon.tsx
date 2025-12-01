import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface MorphIconProps {
  Icon: LucideIcon;
  color?: string;
  size?: number;
}

export default function MorphIcon({ Icon, color = '#3b82f6', size = 24 }: MorphIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Icon
          size={size}
          className="relative z-10 transition-all duration-500"
          style={{
            color: isHovered ? color : '#9ca3af',
            filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none',
            transform: isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)',
          }}
        />

        {isHovered && (
          <>
            <div
              className="absolute inset-0 liquid-morph blur-lg opacity-50"
              style={{
                backgroundColor: color,
                transform: 'scale(1.5)',
              }}
            />
            <div
              className="absolute inset-0 animate-ping"
              style={{
                backgroundColor: color,
                borderRadius: '50%',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

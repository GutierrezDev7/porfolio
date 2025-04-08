import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span {...props} className={`inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full ${props.className}`}>
      {children}
    </span>
  );
};

export { Badge };
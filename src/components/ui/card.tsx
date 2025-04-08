import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`bg-white shadow rounded p-4 ${props.className}`}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`border-b pb-2 mb-2 ${props.className}`}>
      {children}
    </div>
  );
};

const CardContent: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`mb-2 ${props.className}`}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`border-t pt-2 mt-2 ${props.className}`}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <h3 {...props} className={`text-lg font-bold ${props.className}`}>
      {children}
    </h3>
  );
};

const CardDescription: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <p {...props} className={`text-sm text-gray-600 ${props.className}`}>
      {children}
    </p>
  );
};

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription };
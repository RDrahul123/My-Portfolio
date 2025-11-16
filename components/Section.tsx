
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

const Section: React.FC<SectionProps> = ({ title, children, id }) => {
  return (
    <section id={id} className="py-20 px-4 md:px-8 lg:px-16 border-t border-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-light animate-fade-in-up">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;

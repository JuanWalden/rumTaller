
import React from 'react';

const Header: React.FC = () => (
  <div className="text-center mb-8 pt-8">
    <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
      RumTaller
    </h1>
    <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
      Taller de Rumiaciones. <span className="font-semibold">Juan Orta.</span>
    </p>
  </div>
);

export default Header;

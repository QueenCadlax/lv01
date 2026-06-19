import React from 'react';
import EducationPremium from './EducationPremium';
import { Business } from '../types';

interface EducationDirectoryProps {
  businesses: Business[];
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  toggleFavorite?: (id: string) => void;
  favoritesSet?: Set<string>;
}

// Thin wrapper kept for compatibility: delegate rendering to EducationPremium
const EducationDirectory: React.FC<EducationDirectoryProps> = ({ businesses, navigate }) => {
  return <EducationPremium navigate={navigate} businesses={businesses} />;
};

export default EducationDirectory;

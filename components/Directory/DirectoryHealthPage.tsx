import React from 'react';
import HealthPageV2 from '../../components/HealthPageV2';
import { Business } from '../../types';

type Props = {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  businesses: Business[];
  favorites?: Set<string> | string[];
  toggleFavorite?: (id: string) => void;
};

const DirectoryHealthPage: React.FC<Props> = ({ navigate, businesses, favorites, toggleFavorite }) => {
  // Ensure favorites passed as a Set if HealthPageV2 expects it
  const favSet = favorites instanceof Set ? favorites : new Set(favorites || []);
  return (
    <div>
      <HealthPageV2 navigate={navigate} businesses={businesses} favorites={favSet} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default DirectoryHealthPage;

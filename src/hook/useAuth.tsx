import { useContext } from 'react';
import { AuthContext } from '../hoc/authProvider';

export function useAuth () {
  return useContext(AuthContext);
}
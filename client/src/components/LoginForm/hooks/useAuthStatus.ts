import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 

export const useAuthStatus = () => {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  return { isAuthenticated };
};
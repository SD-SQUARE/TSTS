import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

import axios, { AxiosError } from 'axios'; 

import api from '../../../services/api.ts'; 
import { tokenStorage } from '../../../services/tokenStorage.ts';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice.ts';
// import { LoginFormData } from '../validation/loginSchema.ts';
import { RootState } from '../redux/store.ts'; 


interface ApiErrorResponse {
  message?: string; 
}

type AuthAxiosError = AxiosError<ApiErrorResponse>;


export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (credentials) => {
    dispatch(loginStart()); 
    
    try {
      const response = await api.post('/auth/login', credentials);
      

      const { accessToken, refreshToken, user } = response.data; 

      tokenStorage.setTokens(accessToken, refreshToken); 

      dispatch(loginSuccess({ user }));

      navigate('/profile'); 
      
    } catch (err) {
      const isAxiosErr = axios.isAxiosError(err);
      
      const apiError = isAxiosErr

        ? (err as AuthAxiosError).response?.data?.message || 'Login failed: Unknown API error.'
        : 'Network error or unhandled exception occurred.';

      dispatch(loginFailure(apiError));
    }
  };

  return { handleLogin, isLoading, error };
};
import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
  baseURL: `https://car-rental-server-tawny-theta.vercel.app`,

});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
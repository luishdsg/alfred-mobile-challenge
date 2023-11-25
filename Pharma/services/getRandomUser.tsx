import React from 'react';
import axios from 'axios';
import { _getRandomUserInterface } from '../interface/getRandomUser-interface';

export const _getRandomUser = async (pageNumber: number)  => {
    try {
        const APIs = `https://randomuser.me/api/?page=${pageNumber}&results=50&nat=br,es&format=json&inc=id,gender,login,name,nat,location,email,registered,phone,picture,cell%20noinfo`;
        const response = await axios.get(APIs); 
        return response.data.results as _getRandomUserInterface[];
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

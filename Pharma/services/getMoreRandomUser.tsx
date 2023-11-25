import React from 'react';
import { _getRandomUserInterface } from '../interface/getRandomUser-interface';
import axios from 'axios';

const _getMoreRandomUser = async (pageNumber: number) => {
    const url = `https://randomuser.me/api/?page=${pageNumber}&results=50&nat=br,es&format=json&inc=id,gender,login,name,nat,location,email,registered,phone,picture,cell%20noinfo`;
    const response = await axios.get(url);
    return response.data.results as _getRandomUserInterface[] || [];
  };
  
  export default _getMoreRandomUser;
  
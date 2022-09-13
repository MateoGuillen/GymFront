import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'http://localhost:8080/api',
    //method: 'get',
    //headers: {
      //'Content-Type': 'application/json',
    //},
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {

    const token = localStorage.getItem('token');
    //const token = "hola"
    //console.log("token-->", token)
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();
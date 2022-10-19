import axios from 'axios';
//console.log(process.env.NEXT_PUBLIC_API_PRODUCTION)
const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_DEV,
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
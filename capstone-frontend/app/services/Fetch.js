import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);

    const URL_PATH = 'https://ultimate-health-app.herokuapp.com/';

    useEffect(() => {
      setIsLoading(true);
/*
      token = token != undefined ? token : '';

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization' : token }
      };*/

      fetch(URL_PATH+url).then(res => {
          if(!res.ok){
              throw Error('could not fetch data');
          }
          return res.json();
      }).then(data => {
          setApiData(data);
          setIsLoading(false);
          setServerError(null);
      }).catch(err => {
          setIsLoading(false);
          setServerError(err.message);
      });

    }, [url]);

    return {isLoading, apiData, serverError}
  };

  export default useFetch;
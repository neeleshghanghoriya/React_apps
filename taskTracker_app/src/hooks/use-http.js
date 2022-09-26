import { useEffect } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const sendRequest = async (params,applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(params.url,{
        method:params.method?params.method:"GET",
        headers:params.headers?params.headers:{},
        body:params.body? JSON.stringify(params.body):null
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);  
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest
  }
};

export default useHttp;

import  { useState, useEffect } from "react";

const useFetch=(data,url)=> {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    setError(false);
    fetch(url, {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" }
    }).then(function (response) {
      return response.json(data);
    }).then(function (data) {
      setProducts((oldProducts) => [...oldProducts, ...data]);
      data.length&&setHasMore(true);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      setError(true)
    });
  }, [data,url]);

  return { isLoading, error, products, hasMore };
}

export default useFetch;
import  { useState, useEffect } from "react";

const useFetch=pageNum=> {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);


  useEffect(() => {

    setIsLoading(true);
    setError(false);
    const url = 'http://localhost:5000/home';
    var data = {
      user_id:11,
      pageNum
    }
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" }
    }).then(function (response) {
      return response.json(data);
    }).then(function (data) {
      console.log(data);
      setProducts((oldProducts) => [...oldProducts, ...data]);
      setHasMore(true);
      setIsLoading(false);
      
    })
    

  }, [pageNum]);

  return { isLoading, error, products, hasMore };
}

export default useFetch;
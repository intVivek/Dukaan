import React, { useState, useEffect, useRef, useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import HomeItemTray from '../../components/HomeItemTray/HomeItemTray.js';
import './Home.css';

export default function App() {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, error, products, hasMore } = useFetch(pageNum);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log(pageNum);
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
  const tray = products.map((product) =>
    <HomeItemTray product={product}/>
  );
  return (
    <div className="homePage">
        {tray}
      <div ref={lastElementRef}></div>
  
      <div>{error && "Error..."}</div>
    </div>
  );
}

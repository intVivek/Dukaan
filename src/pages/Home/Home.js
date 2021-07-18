import React, { useState, useRef, useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import HomeItemTray from '../../components/HomeItemTray/HomeItemTray.js';
import './Home.css';
import Category from '../../components/Category/Category.js';

export default function Home(props) {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, error, products, hasMore } = useFetch({pageNum},'http://localhost:5000/home');

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
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
    <div  className="homePageMain">
    <Category reload={props.reload} setReload={props.setReload}/>
    <div className="homePage">
        {tray}
      <div ref={lastElementRef}></div>
  
      <div>{error && "Error..."}</div>
    </div>
    </div>
  );
}

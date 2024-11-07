// import React, { useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';

// function Home() {
//     const [items, setItems] = useState([]); // Placeholder for loaded items
//     const [hasMore, setHasMore] = useState(true);

//     const loadData = () => {
//         // Simulate data loading
//         const newItems =  Array.from({ length: 10 }, (_, i) => `Item ${items.length + i + 1}`);
//         setItems([...items, ...newItems]);

//         // Set `hasMore` to false if all data is loaded
//         if (items.length + newItems.length >= 50) {
//             setHasMore(false);
//         }
//     };

//     return (
//         <InfiniteScroll
//             pageStart={0}
//             loadMore={loadData}
//             hasMore={hasMore}
//             loader={<div className='loader' key={0}>Loading...</div>}
//         >
//             <div style={{ height: '200px', overflow: 'scroll' }}>
//                 {items.map((item, index) => (
//                     <div key={index}>{item}</div>
//                 ))}
//             </div>
//         </InfiniteScroll>
//     );
// }

// export default Home;

// import React from 'react';
// import InfiniteScroll from 'react-infinite-scroller';

// function Home()
// {
//     return(
//         <InfiniteScroll
//             pageStart={0}
//             loadMore={loadData}
//             hasMore={true||false}
//             loader={<div className='loader' key={0}> Loading...</div>}
//         >
//             <div style={{height: '200px', overflow: 'scroll'}}>
//                 <section id="home" className="section-home">
//                     <center>
//                         <h1>Welcome to My Portfolio</h1>
//                         <p>I'm Eduardo Munoz, a Software Engineer.</p>
//                     </center>
//                 </section>
//             </div>
//         </InfiniteScroll>
//     )
// }

// export default Home;

// import React, {useState} from 'react'
// import useTestUnlimScroll from './testUnlimScroll';

// function handleSearch(e){
//     setQuery(e.target.value)
//     setPageNumber(1)
// }

// const {
//     books,
//     hasMore,
//     loading,
//     error
// } = useBookSearch(query, pageNumber)


// function Home() {
//     const [query, setQuery] = useState('')
//     const [pageNumber, setPageNumber] = useState(1)
//     useTestUnlimScroll(query, pageNumber)
//     return (
//         <><input type='text' onChange={handleSearch}>

//         </input>
//         {books.map(book => {
//             return <div key={book}>{book}</div>
//         })}
//         <section id="home" className="section-home">
//             <center>
//                 <h1>Welcome to My Portfolio</h1>
//                 <p>I'm Eduardo Munoz, a Software Engineer.</p>
//             </center>
//         </section></>
//     );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "./Loader";

const InfiniteScrollExample1 = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products?offset=10&limit=12")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=12`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <div className='container'>
        <div className='row'>
          {items &&
            items.map((item) => <ProductCard data={item} key={item.id} />)}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollExample1;
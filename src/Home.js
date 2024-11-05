import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

function Home() {
    const [items, setItems] = useState([]); // Placeholder for loaded items
    const [hasMore, setHasMore] = useState(true);

    const loadData = () => {
        // Simulate data loading
        const newItems =  Array.from({ length: 10 }, (_, i) => `Item ${items.length + i + 1}`);
        setItems([...items, ...newItems]);

        // Set `hasMore` to false if all data is loaded
        if (items.length + newItems.length >= 50) {
            setHasMore(false);
        }
    };

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadData}
            hasMore={hasMore}
            loader={<div className='loader' key={0}>Loading...</div>}
        >
            <div style={{ height: '200px', overflow: 'scroll' }}>
                {items.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </InfiniteScroll>
    );
}

export default Home;

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

// // function Home() {
// //     return (
// //         <section id="home" className="section-home">
// //             <center>
// //             <h1>Welcome to My Portfolio</h1>
// //             <p>I'm Eduardo Munoz, a Software Engineer.</p>
// //             </center>
// //         </section>
// //     );
// // }

// export default Home;
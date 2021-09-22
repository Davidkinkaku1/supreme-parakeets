import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


function ShelfPage() {
  const dispatch = useDispatch();
  let shelfData = useSelector(store => store.shelfReducer);

   function deleteHandler(item) {
        dispatch({
            type: 'DELETE_ITEM',
            payload: item.id
        })
    };

  useEffect(() => {
    console.log('in useEffect');
    const action = { type: 'FETCH_SHELF' };
    dispatch(action);
  }, []);

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <ul>
        {shelfData.map((itemData, i) => {
            return <li key={i} itemData={itemData.id}>Item:{itemData.description}, Image:<img src={itemData.image_url}/><button onClick={() => deleteHandler(itemData)}>Delete</button></li>;
        })}
      </ul>  
    </div>
  );
}

export default ShelfPage;

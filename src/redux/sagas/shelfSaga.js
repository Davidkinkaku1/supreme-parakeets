import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "shelf" actions to load the shelf
function* fetchShelf(action) {
    try {
  
      // passes all items from the server to the payload 
      const response = yield axios.get('/api/shelf');
  
     // automatically log items in after shelf
       yield put({ type: 'SET_SHELF', payload: response.data });
  
    } catch (error) {
      console.log('Error with items of shelf:', error);
    }
  }

  function* addShelfItem (action) {
    try {
  
        // passes all items from the server to the payload 
        const response = yield axios.post('/api/shelf', action.payload);
    
        // automatically log items in after shelf
         yield put({ type: 'FETCH_SHELF' });

      } catch (error) {
        console.log('Error with posting item of shelf:', error);
      }
  }


  function* shelfSaga() {
    yield takeLatest('FETCH_SHELF', fetchShelf);
    yield takeLatest('ADD_TO_SHELF', addShelfItem)
    
  }
  



export default shelfSaga;
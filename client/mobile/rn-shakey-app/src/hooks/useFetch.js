// Import necessary hooks and libraries
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const useFetch = (url, options = {}) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  //This function is memoized using `useCallback` to avoid unnecessary re-creations
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(url, options);
      setData(response?.data);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);


  useEffect(() => {
    if (!url) return; // Avoid fetching if no URL is provided
    fetchData(); // Call the fetchData function
  }, [fetchData]);

  //It sets the refreshing state, fetches the data, and resets the refreshing state
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  /**
   * Return the fetched data, loading and error states, and refresh handlers
   */
  return {data, loading, error, refreshing, onRefresh};
};

export default useFetch;

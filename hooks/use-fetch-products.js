import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    axios
      .get('/api/products')
      .then((res) => {
        if (mounted) {
          setProducts(res.data.products);
        }
      })
      .catch((_) => {
        if (mounted) {
          setError(true);
        }
      });

    // cleanup mounted
    return () => (mounted = false);
  }, []);

  return {
    products,
    error,
  };
};
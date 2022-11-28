import { useCallback, useEffect, useState } from 'react';

const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    (...args) => {
      setStatus('pending');
      setResult(null);
      setError(null);

      return asyncFunction(...args)
        .then((response) => {
          setResult(response);
          setStatus('success');
        })
        .catch((err) => {
          setError(err);
          setStatus('error');
        });
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, result, error };
};

export default useAsync;

import useAsync from '../useAsync';

import * as recordsApi from '../../services/recordsApi';

export default function useGetRecords() {
  const {
    status,
    result,
    error,
    execute: getRecords,
  } = useAsync(recordsApi.getRecords, false);

  return {
    status,
    result,
    error,
    getRecords,
  };
}

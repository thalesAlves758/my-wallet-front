import useAsync from '../useAsync';

import * as recordsApi from '../../services/recordsApi';

export default function useDeleteRecord() {
  const {
    status,
    result,
    error,
    execute: createOrUpdateRecord,
  } = useAsync(recordsApi.createOrUpdateRecord, false);

  return {
    status,
    result,
    error,
    createOrUpdateRecord,
  };
}

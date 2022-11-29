import useAsync from '../useAsync';

import * as recordsApi from '../../services/recordsApi';

export default function useDeleteRecord() {
  const {
    status,
    result,
    error,
    execute: deleteRecord,
  } = useAsync(recordsApi.deleteRecordById, false);

  return {
    status,
    result,
    error,
    deleteRecord,
  };
}

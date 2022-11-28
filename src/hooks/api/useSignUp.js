import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignUp() {
  const {
    status,
    result,
    error,
    execute: signUp,
  } = useAsync(authApi.signUp, false);

  return {
    status,
    result,
    error,
    signUp,
  };
}

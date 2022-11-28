import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignIn() {
  const {
    status,
    result,
    error,
    execute: signIn,
  } = useAsync(authApi.signIn, false);

  return {
    status,
    result,
    error,
    signIn,
  };
}

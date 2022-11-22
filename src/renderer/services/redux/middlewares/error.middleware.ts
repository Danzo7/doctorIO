import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { Logger } from '@libs/Logger';
import { toast } from '@stores/overlayStore';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  function filterErrorCode(
    errorCode: number,
    api?: string,
    endpoint?: string,
  ): string | undefined {
    if (api === 'patientApi' && errorCode == 1300) return undefined;
    if (api === 'patientApi' && errorCode == 1200) return 'Wrong input';
    if (api === 'roleApi' && errorCode == 1105)
      return (
        'You do not have permission to ' +
        (endpoint === 'UpdateRole' ? 'update this role' : 'perform this action')
      );

    return 'Unknown error: ' + errorCode;
  }
  if (isRejectedWithValue(action)) {
    const serverError: ServerError | undefined = action?.payload?.data;
    if (serverError) {
      const errorMessage = filterErrorCode(
        serverError.errorCode,
        action?.type?.split('/')?.[0],
        action?.meta?.arg?.endpointName,
      );
      if (errorMessage) toast(errorMessage, 'error', 5000); //TODO: filter errorCode and display a local message
      Logger.error('Middleware', 'Server error', { serverError, action });
    }
  }
  return next(action);
};

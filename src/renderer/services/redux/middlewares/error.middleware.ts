import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { Logger } from '@libs/Logger';
import { toast } from '@stores/overlayStore';

/**
 * Log a warning and show a toast!
 */
let count = 0; //TODO: remove this
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const serverError: ServerError | undefined = action?.payload?.data;
    if (serverError) {
      count++;
      toast(serverError.message + count, 'error', 5000); //TODO: filter errorCode and display a local message
      Logger.error('Middleware', 'Server error', serverError);
    }
  }
  return next(action);
};

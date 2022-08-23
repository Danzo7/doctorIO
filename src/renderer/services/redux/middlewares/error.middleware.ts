import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { ServerError } from '@models/instance.model';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const serverError: ServerError | undefined = action?.payload?.data;
    if (serverError) {
      //console.clear();
      console.error('Server error', serverError);
    }
  }
  return next(action);
};

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
    switch (errorCode) {
      case 1000:
      case 1001:
      case 1002:
      case 1003:
      case 1004:
      case 1005:
      case 1006:
      case 1007:
      case 1008:
      case 1009:
      case 1010:
      case 1100:
      case 1101:
      case 1102:
      case 1103:
      case 1104:
      case 1200:
      case 1201:
      case 1300:
        return undefined;
        break;

      case 1105:
        return (
          'You do not have permission to ' +
          (endpoint === 'UpdateRole'
            ? 'update this role'
            : 'perform this action')
        );
        break;
      case 1106:
        return "You don't have the necessary relationship with this role to perform this action.";
        break;
      case 1107:
        return "You don't have the right permissions to perform this action";
        break;
      case 1108:
        return 'No queue';
        break;
      case 1109:
        return endpoint == 'UpdateRole'
          ? 'You are not allowed to update this role'
          : 'You are not allowed to create this role';
        break;
      case 1301:
        if (endpoint == 'AssignAppointmentToQueue')
          return 'Patient already in queue';
        break;
      case 1302:
        return 'Not acceptable';
        break;
      case 1400:
        return 'Something went wrong';
        break;

      default:
        return 'Unknown error: ' + errorCode;
        break;
    }
  }
  if (isRejectedWithValue(action)) {
    const serverError: ServerError | undefined = action?.payload?.data;
    if (serverError) {
      const errorMessage = filterErrorCode(
        serverError.errorCode,
        action?.type?.split('/')?.[0],
        action?.meta?.arg?.endpointName,
      );
      Logger.error('Middleware', 'Server error', { serverError, action });
      if (errorMessage) toast(errorMessage, 'error', 5000); //TODO: filter errorCode and display a local message
    }
  }
  return next(action);
};

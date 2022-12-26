import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit';
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
      case 1106:
        return "You don't have the necessary relationship with this role to perform this action.";
      case 1107:
        return "You don't have the right permissions to perform this action";
      case 1108:
        return 'No queue';
      case 1109:
        return 'You do not have permission to perform this action';
      case 1301:
        return endpoint == 'AssignAppointmentToQueue' ||
          endpoint == 'addQueueAppointment'
          ? 'Patient already in queue'
          : 'Conflict';
      case 1302:
        return 'Not acceptable';
      case 1303:
        return 'The queue is not empty';
      case 1400:
        return 'Something went wrong';

      default:
        return 'Unknown error: ' + errorCode;
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
      if (errorMessage) toast(errorMessage, 'error', 5000);
    }
  }
  if (
    isFulfilled(action) &&
    action.meta.arg.type == 'mutation' &&
    action.payload
  ) {
    Logger.info('Middleware', 'action', action);
    switch (action.meta.arg.endpointName) {
      case 'uploadFile':
        toast('File uploaded successfully', 'Success', 2000);
        break;

      case 'deleteDocument':
        toast('File deleted successfully', 'Success', 2000);
        break;
      case 'connectMember':
        toast('Connected', 'Success', 2000);
        break;
      case 'addQueueAppointment':
      case 'AssignAppointmentToQueue':
        toast('Patient added to the queue successfully', 'Success', 2000);
        break;
      case 'updateTest':
        toast('Biometric screening added successfully', 'Success', 2000);
        break;
      case 'confirmPayment':
        toast('Payment handed successfully', 'Success', 2000);
        break;

      case 'addPatient':
        toast('New patient added successfully', 'Success', 2000);
        break;

      case 'resumeQueue':
        toast('Queue is resumed successfully', 'Success', 2000);
        break;

      case 'pauseQueue':
        toast('Queue is paused successfully', 'Success', 2000);
        break;
      case 'notifyQueue':
        toast('Queue is notified successfully', 'Success', 2000);
        break;
      case 'resetQueue':
        toast('Reset queue count', 'Success', 2000);
        break;

      case 'progressQueueState':
        toast('New session started', 'Success', 2000);
        break;
      case 'endNext':
        toast('Session ended', 'Success', 2000);
        break;

      case 'bookAppointment':
        toast('New appointment is booked successfully', 'Success', 2000);
        break;

      case 'deleteAppointment':
        toast('The appointment is removed successfully', 'Success', 2000);
        break;
      case 'cancelAppointment':
        toast('The appointment is canceled successfully', 'Success', 2000);
        break;
      case 'addMedicalHistory':
        toast('New medical history added successfully', 'Success', 2000);
        break;
      case 'updateClinicOverview':
        toast('The Clinic information updated successfully', 'Success', 2000);
        break;
      case 'createInvitation':
        toast('Invitation key generated successfully', 'Success', 2000);
        break;
      case 'assignRole':
        toast('Role assigned successfully', 'Success', 2000);
        break;
      case 'revokeRole':
        toast('Role revoked successfully', 'Success', 2000);
        break;
      case 'UpdateRole':
        toast('Role updated successfully', 'Success', 2000);
        break;
      case 'updateMember':
        toast('Member information updated successfully', 'Success', 2000);
        break;
      case 'setAvatar':
        toast('Member avatar updated successfully', 'Success', 2000);
        break;
      case 'updateMemberSecret':
        toast('The secret key updated successfully', 'Success', 2000);
        break;

      case 'findPatientByName':
        break;
      default:
        toast(action.meta.arg.endpointName, 'Success', 2000);
        break;
    }
  }
  return next(action);
};

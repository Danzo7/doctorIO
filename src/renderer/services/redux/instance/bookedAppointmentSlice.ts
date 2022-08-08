import { bookedAppointments } from '@api/fake';
import { BookedAppointment } from '@models/instance.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BookedAppointment[] = bookedAppointments;
const bookedAppointmentSlice = createSlice({
  name: 'bookedAppointment',
  initialState: initialState,
  reducers: {
    removeBookedAppointment: (
      state: BookedAppointment[],
      action: PayloadAction<{ bookDate: Date; patientId: number }>,
    ) => {
      state.splice(
        state.findIndex(
          (book) =>
            book.patientId == action.payload.patientId &&
            book.bookDate == action.payload.bookDate,
        ),
        1,
      );
    },
    addBookedAppointment: (
      state: BookedAppointment[],
      action: PayloadAction<BookedAppointment>,
    ) => {
      state.push(action.payload);
    },
  },
});

export const { removeBookedAppointment, addBookedAppointment } =
  bookedAppointmentSlice.actions;
export default bookedAppointmentSlice.reducer;

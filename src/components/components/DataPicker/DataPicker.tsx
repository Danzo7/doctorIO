import React from "react";
import TextField from "@material-ui/core/TextField";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"; // choose your lib
import {
  DatePicker,
  DateRangePicker,
  LocalizationProvider
} from "@material-ui/pickers";

export default function App() {
  const [value, setValue] = React.useState<any>(new Date());

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <DatePicker
        value={value}
        onChange={setValue}
        renderInput={props => <TextField {...props} />}
      />
      <DateRangePicker
        value={[null, null]}
        onChange={newValue => {
          setValue(newValue);
        }}
        renderInput={(props1, props2) => {
          return (
            <React.Fragment>
              <TextField {...props1} />
              <span>-</span>
              <TextField {...props2} />
            </React.Fragment>
          );
        }}
      />
    </LocalizationProvider>
  );
}

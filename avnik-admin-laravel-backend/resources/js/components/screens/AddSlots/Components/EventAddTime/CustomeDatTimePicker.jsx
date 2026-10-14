import React from "react";
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import {
  DateTimePicker,
} from '@mui/x-date-pickers/DateTimePicker';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
const CustomDateTimePicker = (props) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    label={props.label||"Start"}
                    renderInput={(params) => <TextField {...params} sx={{'.MuiInputBase-input': {height: "0.011em!important"},'.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root':{fontSize:"0.8rem!important"}}} /> }
                    value={props.value}
                    onChange={(event)=>props.onChange(event,props.index)}
                    hideTabs={false}
                    minDate={new Date()}
                    // components={{ Tabs: CustomTabs }}
                    componentsProps={{
                        tabs: {
                            dateRangeIcon: <LightModeIcon />,
                            timeIcon: <AcUnitIcon />,
                        },
                    }}
                />
            </LocalizationProvider>
        </>
    );
};

export default CustomDateTimePicker;

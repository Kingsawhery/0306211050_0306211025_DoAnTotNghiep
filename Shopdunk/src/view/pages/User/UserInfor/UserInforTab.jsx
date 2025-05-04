import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
export default function UserInforTab() {
    const [birthdate, setBirthdate] = useState('');
    const handleChange = (event) => {
        setBirthdate(event.target.value); // Cập nhật ngày sinh khi người dùng nhập ngày mới
    };
    return (
        <div className="user-infor-main-tab p-4">
            <div className="base-infor">
                <div className="col-12">
                    <TextField
                        onClick={
                            (e) => {
                                console.log(birthdate);

                            }
                        }
                        variant="standard" defaultValue="cc" label="Tên hiển thị" sx={{

                            width: '100%',
                            fontSize: '1rem',
                            '& .MuiInputBase-input': {
                                fontSize: '1.2rem',
                                padding: '12px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '1rem',       // Tăng kích thước font chữ của label
                            },
                        }} />
                </div>
                <div className="col-12 d-flex">
                <div className="col-6 mt-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Birthday"
                                onChange={(e) => {
                                    setBirthdate(`${e.$y}-${e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`}-${e.$D > 9 ? e.$D : `0${e.$D}`} 00:00:00`)
                                    //2025-03-24 14:03:59
                                    console.log(e);


                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
      borderBottom: '1px solid gray',
      borderRadius: 0,
      paddingBottom: '2px', // giảm khoảng cách dưới
      paddingTop: '2px',    // giảm khoảng cách trên để "sát lên"
      height:"58px",
      fontSize:"12px"
    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      border: 'none',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                      border: 'none',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                      border: 'none',
                                    },
                                  }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className="col-5 w-50 mt-4">
                    <FormControl className="w-100" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                        <Select
                            style={{
                                height:"42px"
                            }}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            // value={age}
                            // onChange={handleChange}
                            label="Age"
                            onChange={(e)=>{
                                console.log(e);
                                
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={0}>Male</MenuItem>
                            <MenuItem value={1}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                </div>
             
            </div>
            <div className="important-infor"></div>

        </div>
    )
}
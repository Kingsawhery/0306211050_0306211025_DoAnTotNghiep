import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { getInfoUser } from '../../../../services/userServices'; // Tuỳ bạn import API ở đâu

const UserInfoForm = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    phone: '',
    birthday: '',
    address: '',
    gender: '',
  });
  const [birthdate, setBirthdate] = useState('');
  useEffect(() => {
    handleGetDataUser();
  }, []);

  const handleGetDataUser = async () => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return;

      const dataUser = JSON.parse(raw);
      const userData = await getInfoUser(dataUser);

      if (userData) {
        setData({
          username: userData.username || '',
          email: userData.email || '',
          phone: userData.phone || '',
          birthday: userData.birthday || '',
          address: userData.address || '',
          gender: userData.gender,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="user-infor-main-tab p-4">
      <div className="base-infor">
        <div className="col-12 mb-3">
          <TextField
            label="Tên hiển thị"
            variant="standard"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{
              width: '100%',
              fontSize: '1rem',
              '& .MuiInputBase-input': { fontSize: '1rem', padding: '12px' },
              '& .MuiInputLabel-root': { fontSize: '1rem' },
            }}
          />
        </div>

        <div className="col-12 mb-3">
          <TextField
            label="Email"
            variant="standard"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{
              width: '100%',
              fontSize: '1rem',
              '& .MuiInputBase-input': { fontSize: '1rem', padding: '12px' },
              '& .MuiInputLabel-root': { fontSize: '1rem' },
            }}
          />
        </div>

        <div className="col-12 mb-3">
          <TextField
            label="Số điện thoại"
            variant="standard"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{
              width: '100%',
              fontSize: '1rem',
              '& .MuiInputBase-input': { fontSize: '1rem', padding: '12px' },
              '& .MuiInputLabel-root': { fontSize: '1rem' },
            }}
          />
        </div>

        <div className="col-12 mb-3">
          <TextField
            label="Địa chỉ"
            variant="standard"
            value={data.address || ''}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{
              width: '100%',
              fontSize: '1rem',
              '& .MuiInputBase-input': { fontSize: '1rem', padding: '12px' },
              '& .MuiInputLabel-root': { fontSize: '1rem' },
            }}
          />
        </div>

        <div className="col-12 d-flex justify-content-between mb-3">
          <div className="col-6 pe-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
  label="Birthday"
  value={data.birthday ? dayjs(data.birthday) : null}
  onChange={(e) => {
    setBirthdate(
      `${e.$y}-${e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`}-${e.$D > 9 ? e.$D : `0${e.$D}`} 00:00:00`
    );
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderBottom: '1px solid gray',
      borderRadius: 0,
      paddingBottom: '2px',
      paddingTop: '2px',
      height: '58px',
      fontSize: '12px',
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

            </LocalizationProvider>
          </div>

          <div className="col-6 ps-2">
            <FormControl className="w-100" variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel shrink>Giới tính</InputLabel>
              <Select
                value={data.gender === true ? 1 : data.gender === false ? 0 : ''}
                onChange={(e) => setData({ ...data, gender: e.target.value === 1 })}
                style={{ height: '42px' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>Nam</MenuItem>
                <MenuItem value={1}>Nữ</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;

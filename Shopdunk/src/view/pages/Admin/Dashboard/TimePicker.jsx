import { useState } from "react";
import { Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function MonthYearPicker({ onChange }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const months = [
    { value: "all", label: "Tất cả" }, // 👈 Thêm option "Tất cả"
    ...Array.from({ length: 12 }, (_, i) => ({
      value: (i + 1).toString().padStart(2, "0"),
      label: `Tháng ${i + 1}`,
    })),
  ];

  const [selectedYear, setYear] = useState(currentYear.toString());
  const [selectedMonth, setMonth] = useState("all");

  const handleChange = (type, value) => {
    if (type === "month") setMonth(value);
    else setYear(value);

    onChange?.({
      year: type === "month" ? selectedYear : value,
      month:
        type === "month"
          ? value === "all" ? null : value
          : selectedMonth === "all" ? null : selectedMonth,
    });
  };

  return (
    <Box display="flex" gap={2}>
      <FormControl size="small">
        <InputLabel>Tháng</InputLabel>
        <Select
          value={selectedMonth}
          label="Tháng"
          onChange={(e) => handleChange("month", e.target.value)}
          style={{ width: 120 }}
        >
          {months.map((m) => (
            <MenuItem key={m.value} value={m.value}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Năm</InputLabel>
        <Select
          value={selectedYear}
          label="Năm"
          onChange={(e) => handleChange("year", e.target.value)}
          style={{ width: 100 }}
        >
          {years.map((y) => (
            <MenuItem key={y} value={y.toString()}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

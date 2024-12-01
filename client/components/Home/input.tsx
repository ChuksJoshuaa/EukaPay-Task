"use client";

import useStyles from "@/components/Auth/styles";
import { BpCheckbox } from "@/components/Checked";
import useInput from "@/components/Home/useInput";
import TextField from "@/components/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const input = () => {
  const classes = useStyles();
  const {
    handleChange,
    handleDoneChange,
    handleUnfinishedChange,
    unfinishedChecked,
    doneChecked,
    dueDate,
    setDueDate,
    title,
    loading,
    handleSubmit
  } = useInput();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
        <Box mb={3} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h5" color="#222" fontWeight={600}>
            Create Todo
          </Typography>
        </Box>
        <Box mb={3}>
          <TextField
            name="title"
            value={title}
            label="Title"
            handleChange={handleChange}
            autoFocus
            type="text"
          />
        </Box>

        <DatePicker
          label="Due Date"
          format="MM/DD/YYYY"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
        />

        <Box gap={5} mt={3}>
          <Typography
            variant="h6"
            color="body1"
            fontWeight={500}
            marginLeft={0.5}
          >
            Status
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            width={"100%"}
            gap={5}
            mt={1}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={0.1}
            >
              <BpCheckbox
                checked={doneChecked}
                onChange={handleDoneChange}
                inputProps={{ "aria-label": "Done" }}
              />
              <Typography variant="body2">Done</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={0.1}
            >
              <BpCheckbox
                checked={unfinishedChecked}
                onChange={handleUnfinishedChange}
                inputProps={{ "aria-label": "Unfinished" }}
              />
              <Typography variant="body2">Unfinished</Typography>
            </Box>
          </Box>
        </Box>

        <Box mt={2}>
          <LoadingButton
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              !title || !(doneChecked || unfinishedChecked)
            }
            loading={loading}
            onClick={handleSubmit}
          >
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              lineHeight={2}
              fontWeight={600}
            >
              Create
            </Typography>
          </LoadingButton>
        </Box>
      </React.Fragment>
    </LocalizationProvider>
  );
};

export default input;

"use client";

import useStyles from "@/components/Auth/styles";
import { BpCheckbox } from "@/components/Checked";
import useInput from "@/components/Home/useInput";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import TextField from "@/components/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Container, Paper, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const EditPage = () => {
  const classes = useStyles();
  const { id } = useParams();
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
    handleUpdate,
    handleFetchTodoById,
    isTodoFetching,
    EmptyData,
    router
  } = useInput();

  useEffect(() => {
    if (id) handleFetchTodoById(id as string);
  }, [id]);

  return (
    <Layout>
      {isTodoFetching ? (
        <Loading />
      ) : (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <React.Fragment>
                <Box
                  mb={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h5" color="#222" fontWeight={600}>
                    Update Todo
                  </Typography>
                </Box>
                <Box mb={3} sx={{ width: "100%" }}>
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
                  sx={{ width: "100%" }}
                />

                <Box gap={5} mt={3} sx={{ width: "100%" }}>
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

                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  gap={5}
                  sx={{ width: "100%" }}
                >
                  <LoadingButton
                    type="button"
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    disabled={!title}
                      onClick={() => {
                        EmptyData();
                        router.push("/")
                    }}
                  >
                    <Typography
                      variant="body1"
                      textTransform={"capitalize"}
                      lineHeight={2}
                      fontWeight={600}
                    >
                      Cancel
                    </Typography>
                  </LoadingButton>

                  <LoadingButton
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}
                    disabled={!title}
                    loading={loading}
                    onClick={() => handleUpdate(id as string)}
                  >
                    <Typography
                      variant="body1"
                      textTransform={"capitalize"}
                      lineHeight={2}
                      fontWeight={600}
                    >
                      Update
                    </Typography>
                  </LoadingButton>
                </Box>
              </React.Fragment>
            </LocalizationProvider>
          </Paper>
        </Container>
      )}
    </Layout>
  );
};

export default EditPage;

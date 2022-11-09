import * as React from "react";
import { Paper } from "@mui/material";

interface SurveyBlockProps {
  children: React.ReactNode;
}

export const SurveyBlock = ({ children }: SurveyBlockProps) => {
  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      {children}
    </Paper>
  );
};

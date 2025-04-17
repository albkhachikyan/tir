import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useSubject } from "../../hooks/subject/useSubject";
import { useAssignSubjectToTeacher } from "../../hooks/teacher/useAssigneSubjectToTeacher";

type AssignSubjectPopoverProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  teacherId: string;
};

export const AssignSubjectPopover = ({
  open,
  anchorEl,
  onClose,
  teacherId,
}: AssignSubjectPopoverProps) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const { data: subjects, isLoading: loadingSubjects } = useSubject();
  const { mutate, error } = useAssignSubjectToTeacher();

  const handleAssign = () => {
    mutate(
      { teacherId, subjectId: selectedSubjectId },
      {
        onSuccess: () => {
          setSelectedSubjectId("");
          onClose();
        },
      }
    );
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Typography variant="h6" gutterBottom>
          Assign Subject
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(error as Error).message}
          </Alert>
        )}

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel id="subject-label">Subject</InputLabel>
          <Select
            labelId="subject-label"
            value={selectedSubjectId}
            label="Subject"
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            disabled={loadingSubjects}
          >
            {loadingSubjects ? (
              <MenuItem value="">
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              subjects?.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAssign}
          sx={{ mt: 2 }}
        >
          Assign
        </Button>
      </Box>
    </Popover>
  );
};

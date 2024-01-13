import { TextField } from "@mui/material";
import { validateField } from "../utils/helper";
import { FieldProps } from "../utils/props";

const Field = ({
  fieldName,
    label,
  value,
  touchedFields,
  initialValues,
  handleChange,
}: FieldProps) => {
  return (
    <TextField
      name={fieldName}
      value={value}
      onChange={(e) => {
        handleChange(e);
      }}
      label={label}
      variant="outlined"
      size="small"
      InputLabelProps={{ style: { fontSize: 12 } }}
      error={
        validateField({
          fieldName: fieldName,
          touchedFields,
          initialValues,
        }) !== ""
      }
      helperText={validateField({
        fieldName: fieldName,
        touchedFields,
        initialValues,
      })}
      InputProps={{ style: { height: 40, fontSize: 14 } }}
      sx={{
        "& .MuiFormHelperText-root": { fontSize: 10 },
      }}
    />
  );
};

export default Field;

import { useState } from "react";

// eslint-disable-next-line import/prefer-default-export
export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

// export const generateFormRow = (fields) => {
//   const formRows = fields;

//   const fieldNames = {};
//   for (let i = 0; i < formRows.length; i += 1) {
//     for (let f = 0; f < formRows[i].length; f += 1) {
//       fieldNames[formRows[i][f].name] = "";
//     }
//   }

//   // eslint-disable-next-line no-use-before-define
//   const { onBlur, onChange, onSubmit, values } = useForm(registerUser, fieldNames);

//   for (let i = 0; i < formRows.length; i += 1) {
//     for (let f = 0; f < formRows[i].length; f += 1) {
//       formRows[i][f].error = !!errors[formRows[i][f].name];
//       formRows[i][f].value = values[formRows[i][f].name];
//       formRows[i][f].onChange = onChange;
//       formRows[i][f].onBlur = onBlur;
//     }
//   }
// };

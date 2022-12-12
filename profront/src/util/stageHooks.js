import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [startDate, setStartDate] = useState(new Date());

  const onChange = (event, data) => {
    if (data !== undefined) {
      let dataValue = data.value;
      if (data.name === "amount") {
        dataValue = parseFloat(dataValue);
      }
      if (data.name === "duration") {
        dataValue = parseInt(dataValue);
      }
      if (data.name === "stageDate") {
        dataValue = dataValue.toString();
      }
      setValues({ ...values, [data.name]: dataValue });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  const dateChange = (date) => {
    setStartDate(date);
    const dateName = "stageDate";
    setValues({ ...values, [dateName]: date.toISOString() });
  };

  return {
    onChange,
    onSubmit,
    dateChange,
    startDate,
    values,
  };
};

/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================
 
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import * as Yup from "yup";
import { Formik } from "formik";

// eslint-disable-next-line import/no-unresolved
import FormRow from "layouts/forms/componenets/UserForm/FormRow";

import { useQuery, useMutation } from "@apollo/client";
import { modules } from "util/modules";

import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";

import { REGISTER_USER, UPDATE_USER } from "layouts/forms/Queries";
import { USER_DATA, USERS_LIST } from "layouts/lists/Queries";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// import { useLoading } from "context/loading";
// import Loading from "components/Common/Loading";

function UserForm({ fields, group }) {
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  // const [user, setUser] = React.useState(null);

  // eslint-disable-next-line no-unused-vars
  const ref = useRef(null);

  // // const [usData, setUsData] = React.useState(null);
  const handleLoadingClose = () => {
    setLoadingOpen(false);
  };

  const formRows = fields;
  const route = useLocation().pathname.split("/").slice(1);
  const action = route[1];
  const pk = route[2];

  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [createUser, { lodaing: createloading }] = useMutation(REGISTER_USER, {
    // eslint-disable-next-line no-unused-vars
    update(cache, { data: { createUser: userData } }) {
      const newUserFromResponse = userData?.user;
      const existingUsers = cache.readQuery({
        query: USERS_LIST,
      });

      cache.writeQuery({
        query: USERS_LIST,
        data: {
          users: existingUsers?.users.concat(newUserFromResponse),
        },
      });

      navigation(`/${route[0]}`, {
        state: {
          msg: { text: "User created successfully", type: "success" },
        },
      });

      // console.log("userData dd", userData);
    },
    onError(err) {
      console.log(err);
      // setErrors(JSON.parse(err.message.replace(/'/g, '"')));
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [updateUser, { lodaing: updateloading }] = useMutation(UPDATE_USER, {
    // eslint-disable-next-line no-unused-vars
    update(cache, { data: { updateUser: userData } }) {
      const updatedUserFromResponse = userData?.user;
      cache.writeQuery({
        query: USER_DATA,
        data: {
          user: updatedUserFromResponse,
          variables: {
            pk: updatedUserFromResponse.id,
          },
        },
      });

      navigation(`/${route[0]}`, {
        state: {
          msg: { text: "User updated successfully", type: "success" },
        },
      });

      // console.log("userData updated", userData);
    },
    onError(err) {
      console.log(err);
      // setErrors(JSON.parse(err.message.replace(/'/g, '"')));
    },
  });

  let currentUser = null;

  if (action === "edit") {
    const { data, loading, error } = useQuery(USER_DATA, {
      variables: { pk },
    });
    if (loading) {
      return <LoadingComponent />;
    }
    if (error) {
      return <ErrorComponent message="There was an error loading data" />;
    }
    currentUser = data.user;
  }

  const initialValues = {};
  const validations = {};
  for (let i = 0; i < formRows.length; i += 1) {
    for (let f = 0; f < formRows[i].length; f += 1) {
      if (formRows[i][f].action !== undefined && formRows[i][f].action !== action) {
        // formRows = removeFromTree(formRows, formRows[i][f].name);
      } else {
        if (action === "edit") {
          initialValues[formRows[i][f].name] =
            currentUser[formRows[i][f].name] !== undefined ? currentUser[formRows[i][f].name] : "";
        } else {
          initialValues[formRows[i][f].name] =
            formRows[i][f].defaultValue !== undefined ? formRows[i][f].defaultValue : "";
        }
        if (formRows[i][f].validation !== undefined) {
          validations[formRows[i][f].name] = formRows[i][f].validation;
        }
      }
    }
  }

  return (
    <Formik
      initialValues={{
        ...initialValues,
      }}
      validationSchema={Yup.object().shape(validations)}
      onSubmit={(values) => {
        // console.log("aaaaa", JSON.stringify(values));
        if (action === "edit") {
          updateUser({
            variables: values,
          });
        } else if (action === "add") {
          updateUser({
            variables: values,
          });
        }
      }}
    >
      {({ isValid, handleSubmit, errors, touched, ...props }) => (
        <MDBox width="100%" pt={3} pb={3}>
          <MDTypography variant="h4" sx={{ textTransform: "capitalize" }}>
            {/* {group} information {loading && <Loading />} */}
          </MDTypography>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loadingOpen}
            onClick={handleLoadingClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <MDBox
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            // className={createloading ? "loading" : ""}
            isValidating
          >
            {formRows.map((row) => (
              <FormRow
                key={row[0].name}
                row={row}
                errors={errors}
                touched={touched}
                action={action}
                {...props}
              />
            ))}
            <MDBox mt={4} mb={1}>
              <MDButton
                type="submit"
                variant="gradient"
                color={modules[group].class}
                fullWidth
                // disabled={Boolean(!isValid)}
              >
                {action === "add" && "Add new"}
                {action === "edit" && "Update"}
                &nbsp;{group}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
    </Formik>
  );
}

// Setting default values for the props of UserForm
UserForm.defaultProps = {
  fields: [],
  group: "",
};

// Typechecking props for the UserForm
UserForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.array),
  group: PropTypes.string,
};

export default UserForm;

import React from "react";

import { gql, useQuery } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";

const NAVIGATIONS = gql`
  query users($parent: String) {
    navs(parent: $parent) {
      type
      name
      key
      icon
      route
      collapse {
        name
        key
        route
        component
      }
    }
  }
`;

export default function Droutes() {
  const parent = "sidebar";
  const { data, loading, error } = useQuery(NAVIGATIONS, {
    variables: { parent },
  });
  console.log("__##__##_##__##");

  if (loading) {
    return <LoadingComponent />;
  }
  console.log("ddddddd", data);

  if (error) {
    return <ErrorComponent />;
  }

  return <div>{data.navs}</div>;
}

import React, { useState } from "react";
import {
  DataValuesContext,
  defaultValues
} from "../../contexts/DataValuesContext";
export default function DataValuesWrapper(props) {

  const [concise, setConcise] = React.useState(5);

  const value = {
    concise: concise,
    setConcise: setConcise,
  }

  return (
    <DataValuesContext.Provider
      value={value}
    >
      {props.children}
    </DataValuesContext.Provider>
  );
}

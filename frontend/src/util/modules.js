import saleManagerData from "layouts/lists/data/saleManagerData";
import managerModule from "layouts/forms/modules/managerModule";

import agentData from "layouts/lists/data/agentData";
import agentModule from "layouts/forms/modules/agentModule";

import clientData from "layouts/lists/data/clientData";
import clientModule from "layouts/forms/modules/clientModule";

// eslint-disable-next-line import/prefer-default-export
export const modules = {
  manager: {
    class: "info",
    color: "white",
    data: saleManagerData,
    fields: managerModule.fields,
  },
  agent: {
    class: "warning",
    color: "white",
    data: agentData,
    fields: agentModule.fields,
  },
  client: {
    class: "success",
    color: "white",
    data: clientData,
    fields: clientModule.fields,
  },
};

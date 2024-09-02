import { initAuth0 } from "@auth0/nextjs-auth0";

import { getStore } from "./store";

const store = getStore();
export default initAuth0({
  session: { store },
  backchannelLogout: !!store,
});

import auth from "solid-auth-client";

let WEBID = undefined;

async function popupLogin() {
  let session = await auth.currentSession();
  let popupUri = "https://solid.community/common/popup.html";
  if (!session) session = await auth.popupLogin({ popupUri });
  alert(`Logged in as ${session.webId}`);
  WEBID = session.webId;
}

async function waitForLoggedIn() {
  await auth.trackSession(async session => {
    if (!session) {
      console.log("The user is not logged in");
      await popupLogin();
    } else {
      console.log(`The user is ${session.webId}`);
    }
  });
}

async function getWebid() {
  return WEBID;
}

export { waitForLoggedIn, getWebid };

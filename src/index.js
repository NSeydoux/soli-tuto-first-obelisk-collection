import { customCollection } from "./collection";
import { waitForLoggedIn, getWebid } from "./login";
import { getParentResource, getResourceSlug, explainError } from "./utils";
import auth from "solid-auth-client";
import $ from "jquery";

// Enter the pod where you want to store your obelisk collection
const pod = "https://my.pod.iri";
const collectionName = "myObeliskCollection";
// Make sure that you are allowed to write in this container.
// Make sure it ends with a slash
const containerLocation = pod + "/public/collections/";
const documentLocation = containerLocation + collectionName;

// Let's see if you are an obelisk collector...
if (pod !== "https://my.pod.iri") {
  checkoutObelisks(documentLocation);
} else {
  $("#app").text("Please set your pod IRI");
}

async function checkoutObelisks(collectionLocation) {
  await waitForLoggedIn();
  if (await makeSureCollectionExists(collectionLocation)) {
    lookAtCollection(collectionLocation);
  }
}

function lookAtCollection(collectionLocation) {
  // First, let us test that the document doesn't already exist
  auth
    .fetch(collectionLocation)
    .then(data => {
      console.log("What a nice obelisk collection!");
      return data.text();
    })
    .then(res => {
      console.log(res);
      $("#app").text("Here is your collection: \n\n" + res);
    })
    .catch(error => {
      console.log(error);
    });
}

async function makeSureCollectionExists(collectionLocation) {
  return await auth
    .fetch(collectionLocation)
    .then(async data => {
      if (data.status === 404) {
        // If you don't have a collection, we'll create it for you
        const creationstatus = await createCollection(
          getParentResource(collectionLocation),
          getResourceSlug(collectionLocation)
        );
        if (creationstatus === 201) {
          return true;
        } else {
          $("#app").html(
            "Received <b>error code " +
              creationstatus +
              "</b> when creating the collection. \n" +
              explainError(creationstatus)
          );
          return false;
        }
      } else {
        // The collection is already there
        return true;
      }
    })
    .catch(error => {
      console.log(error);
    });
}

async function createCollection(container, collectionSlug) {
  console.log("You don't have an obelisk collection yet? Let's fix this!");

  const queryParam = {
    method: "PUT",
    headers: {
      "Content-Type": "text/turtle",
      Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"'
    },
    // Look at collection.js to see how the vocabulary is used
    body: customCollection(await getWebid())
  };
  const path = `${ container }/${ collectionSlug }`;
  
  console.log("Creating collection under container " + container);
  return auth
    .fetch(path, queryParam)
    .then(response => {
      console.log(response.statusText);
      return response.status;
    })
    .catch(error => {
      console.log(error);
    });
}

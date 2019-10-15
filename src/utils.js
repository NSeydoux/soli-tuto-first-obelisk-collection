function getParentResource(resourceIri) {
  const iriComponents = resourceIri.split("/");
  const parentComponents = iriComponents.slice(0, iriComponents.length - 1);
  return parentComponents.join("/");
}

function getResourceSlug(resourceIri) {
  const iriComponents = resourceIri.split("/");
  return iriComponents[iriComponents.length - 1];
}

function explainError(errorCode) {
  if (errorCode === 401) {
    return "Are you authenticated and do you have write permission ?";
  } else if (errorCode === 403) {
    return `Is the domain of this application in your <b>trusted apps</b> ?
Otherwise, please refer to <a href="https://github.com/solid/userguide/tree/2019-10-Updates">the user guide</a>.
Note that the authorized domain should not include a trailing "/" (the sandbox domain looks like https://1ybvq.csb.app). 

If it is, does it have write permission ?`;
  } else if (errorCode === 404) {
    return "Are you targeting an existing container where to create the collection ?";
  }
}

export { getParentResource, getResourceSlug, explainError };

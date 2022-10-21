export const getServerURL = (): string => {
  let serverURL;

  switch (process.env.REACT_APP_STAGE) {
    case "prod":
      serverURL = "http://52.20.228.225:8787"
      break;
    case "dev":
      serverURL = "http://localhost:8787";
      break;
    case "test":
      serverURL = "http://54.85.124.217:8787";
      break;
    default:
      serverURL = "http://localhost:8787";
  }

  return serverURL;
}


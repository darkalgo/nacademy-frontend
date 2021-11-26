import Notification from "./Notification";

const ErrorHandler = (message, history) => {
  console.log(message);
  if (message === "Session Expired") {
    sessionStorage.clear();
    history.push("/login");
  } else {
    Notification(message, "Please fix this error and try again. Otherwise communicate with the admin", "error");
  }
};

export default ErrorHandler;

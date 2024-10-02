import moment from "moment";

export const getGreeting = () => {
  const currentHour = moment().hour(); // Get the current hour

  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

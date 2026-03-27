export const getInitials = (fullName: string): string => {
  // Trim leading/trailing spaces and split the string by one or more spaces
  const namesArray = fullName.trim().split(/\s+/);

  if (namesArray.length === 0) {
    return "";
  }

  // Get the first initial
  let initials = namesArray[0].charAt(0).toUpperCase();

  // If there is more than one name, get the last initial
  if (namesArray.length > 1) {
    initials += namesArray[namesArray.length - 1].charAt(0).toUpperCase();
  }

  return initials;
};

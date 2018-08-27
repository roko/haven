export const contains = ({ firstName, lastName }, query) => {
  
  if (firstName.toLowerCase().includes(query) || lastName.toLowerCase().includes(query)) {
    return true;
  }

  return false;
};

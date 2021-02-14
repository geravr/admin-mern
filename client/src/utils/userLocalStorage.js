export const setUserLS = (user) => {
  localStorage.setItem("usr", JSON.stringify(user));
};

export const getUserLS = () => {
  const user = localStorage.getItem("usr");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const deleteUserLS = () => {
  localStorage.removeItem("usr");
};

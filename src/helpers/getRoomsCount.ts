export const getRoomsArr = () => {
  return !!localStorage.getItem("rooms")
    ? JSON.parse(localStorage.getItem("rooms") as string)
    : [];
};

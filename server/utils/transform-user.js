export const transformUser = (userData) => {
  const hasUser = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    book_for_years: userData.book_for_years,
  };

  return hasUser;
};

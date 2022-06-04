import { Navbar, ActiveResource } from "../../comonents";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ActiveResource />
      {children}
    </>
  );
};

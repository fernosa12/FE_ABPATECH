import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      {/* {!isMobile ? <NavbarComponent /> : <HumburgerMenuComponent />} */}

      <div className="w-screen h-screen  bg-white">
        <Outlet />
      </div>
    </>
  );
}

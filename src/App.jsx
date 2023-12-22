import { useEffect } from "react";
import { useLocation, useNavigation, Outlet } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CallToAction from "./components/cta/Call-To-Action";
import CurveBars from "./components/spinners/CurveBars";
import SpinnerContainer from "./components/utils/SpinnerContainer";
import { EXCLUDE_PATHS } from "./components/utils/constants";
import ToastNotification from "./portals/ToastNotification";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const navigation = useNavigation();

  useEffect(() => {
    const scrollOption = {
      top: 0,
      left: 0,
      behavior: "instant",
    };
    window.scrollTo(scrollOption);
  }, [pathname]);

  let cta = null;
  if (!EXCLUDE_PATHS.some((path) => new RegExp(path).test(pathname))) {
    cta = <CallToAction />;
  }

  return (
    <>
      <Header />
      {navigation.state !== "idle" ? (
        <SpinnerContainer>
          <CurveBars />
        </SpinnerContainer>
      ) : (
        <>
          <main>
            <Outlet />
          </main>
          {cta}
        </>
      )}
      <Footer />
      <ToastNotification />
    </>
  );
}

export default App;

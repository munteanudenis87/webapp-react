import Header from "../components/Header"
import Loader from "../components/Loader";
import { Outlet } from "react-router-dom";

// import del context per il loader
import { useGlobal } from "../contexts/GlobalContext";

function DefaultLayout() {

  // prendiamo dal context il valore che ci serve
  const { isLoading } = useGlobal();

  return (
    <>
        <Header />
        <main className="container">
            <Outlet />
        </main>
        {isLoading && <Loader />}
    </>
  )
}

export default DefaultLayout
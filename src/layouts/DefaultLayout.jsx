import Header from "../components/Header"
import { Outlet } from "react-router-dom";

function DefaultLayout() {

  return (
    <>
        <Header />
        <main className="container">
            <Outlet />
        </main>
    </>
  )
}

export default DefaultLayout
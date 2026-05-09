import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import CreateMoviePage from "./pages/CreateMoviePage";
import DefaultLayout from "./layouts/DefaultLayout"
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import del provide per wrappare l'app per uso del context
import { GlobalProvider } from "./contexts/GlobalContext";

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/create" element={<CreateMoviePage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App

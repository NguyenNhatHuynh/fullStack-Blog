import { Routes, Route, Outlet } from "react-router-dom";
import {
  BlogDetails,
  CategoriesPage,
  Home,
  LoginPage,
  SignupPage,
  WriterPage,
  Contact,
  About,
} from "./pages";
import Loading from "./components/Loading";
import { Footer, Navbar } from "./components";
import useStore from "./store";

function Layout() {
  const { theme } = useStore();
  return (
    <div className={`w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-28 ${theme}`}>
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const { theme, isLoading } = useStore();

  return (
    <main className={theme}>
      <div className={`w-full min-h-screen relative ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<CategoriesPage />} />
            <Route path="/:slug/:id?" element={<BlogDetails />} />
            <Route path="/writer/:id" element={<WriterPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
        </Routes>
        {isLoading && <Loading />}
      </div>
    </main>
  );
}

export default App;
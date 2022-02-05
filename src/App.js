import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Categories from "./components/categories/categories";
import CartPage from "./components/cartPage/cartPage";
import DescriptionPage from "./components/descriptionPage/descriptionPage";
import Loading from "./components/shared/loading/loading";
import { GET_CATEGORIES } from "./graphQL/queries";
import { useQuery } from "@apollo/client";
import BackDrop from "./components/shared/backDrop/backDrop";
import { useContext } from "react";
import { AppContext } from "./contexts/appContext";

function App() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const { showBackDrop } = useContext(AppContext);

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  let navLinks = [];
  data && data.categories.map((c) => navLinks.push(c.name));

  return (
    <>
      {showBackDrop && <BackDrop />}
      <NavBar links={navLinks} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Categories categories={data && data.categories} />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<DescriptionPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

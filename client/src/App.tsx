import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./Layout";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import { ProfilePage } from "./pages/ProfilePage";
import { PlacePageEdit } from "./pages/PlacePageEdit";
import { AddPlaceFormPage } from "./pages/AddPlaceFormPage";
import { PlacePageView } from "./pages/PlacePageView";
import { BookingsPage } from "./pages/BookingsPage";
import { BookingPlacePage } from "./pages/BookingPlacePage";
import { SearchProvider } from "./context/SearchContext";
import { SearchResults } from "./pages/SearchResults";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <SearchProvider>
      <UserContextProvider>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<MainPage />} path="/" />
            <Route element={<SearchResults />} path="/search-results" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/registration" />
            <Route element={<ProfilePage />} path="/account" />
            <Route element={<PlacePageEdit />} path="/account/places" />
            <Route element={<AddPlaceFormPage />} path="/account/places/new" />
            <Route element={<AddPlaceFormPage />} path="/account/places/:id" />
            <Route element={<PlacePageView />} path="/places/:id" />
            <Route element={<BookingsPage />} path="account/bookings" />
            <Route
              element={<BookingPlacePage />}
              path="/account/bookings/:id"
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </SearchProvider>
  );
}

export default App;

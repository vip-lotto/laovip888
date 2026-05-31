import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

import Bet from "./pages/Bet"
import Result from "./pages/Result"
import Live from "./pages/Live"
import History from "./pages/History"
import Dream from "./pages/Dream"
import Deposit from "./pages/Deposit"
import Finance from "./pages/Finance"
import Withdraw from "./pages/Withdraw"
import Winners from "./pages/Winners"

import Receipt from "./pages/Receipt"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* HOME */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* BET */}
        <Route
          path="/bet"
          element={<Bet />}
        />

        {/* RESULT */}
        <Route
          path="/result"
          element={<Result />}
        />

        {/* LIVE */}
        <Route
          path="/live"
          element={<Live />}
        />

        {/* HISTORY */}
        <Route
          path="/history"
          element={<History />}
        />

        {/* DREAM */}
        <Route
          path="/dream"
          element={<Dream />}
        />

        {/* DEPOSIT */}
        <Route
          path="/deposit"
          element={<Deposit />}
        />

        <Route
          path="/finance"
          element={<Finance />}
        />

        <Route
          path="/withdraw"
          element={<Withdraw />}
        />

        {/* RECEIPT */}
        <Route
          path="/receipt"
          element={<Receipt />}
        />
        
        <Route
          path="/winners"
          element={<Winners />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App
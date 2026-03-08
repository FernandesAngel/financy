import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/SignUp";
import { useAuthStore } from "./stores/auth";
import { Home } from "./pages/Transactions/Home";
import { Profile } from "./pages/Auth/Profile";
import { Categories } from "./pages/Transactions/Categories";
import { Transactions } from "./pages/Transactions/Transactions";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={useAuthStore().isAuthenticated ? <Home /> : <Login />}
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;

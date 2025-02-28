import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Layout from "./Layout";
import { relogin } from "@/store/slices/authSlice";

const Register = lazy(() => import("@/pages/RegisterPage"));
const Auth = lazy(() => import("@/pages/AuthPage"));
const Email = lazy(() => import("@/pages/EmailPage"));

const routes = [
  { path: "/register", element: <Register />, isProtected: false },
  { path: "/auth", element: <Auth />, isProtected: false },
  { path: "/emails", element: <Email />, isProtected: true },
];

const AppRouter = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem("authToken");
  const username = useSelector((state: RootState) => state.auth.username);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && !username) {
      dispatch(relogin() as any).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, token, username]);

  if (loading) return <Loader />;

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            {routes.map(({ path, element, isProtected }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    {isProtected && !token ? <Navigate to="/auth" /> : element}
                  </Suspense>
                }
              />
            ))}
            <Route path="*" element={<Navigate to={token ? "/emails" : "/auth"} />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;

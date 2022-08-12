import { useLocalStorage } from "./Hooks/useLocalStorage";
import Login from "./routes/account/login";
import Home from "./routes/Home";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Signup from "./routes/account/signup";
import NotFound from "./routes/NotFound";
import AccountFeed from "./routes/account/feed";
import AccountHome from "./routes/account/home";
import Logout from "./routes/account/logout";
import Profile from "./routes/account/profile";
import HealthSignup from "./Components/SignupPage/ActivityLevelBox";
import Navbar from "./Components/Navbar";
import ForgotPassword from "./routes/account/forgot-password";
import ResetPassword from "./routes/account/reset";
import AccountSettings from "./routes/account/settings";
import VerifyEmail from "./routes/account/verify-email";
import GoogleAuthRedirect from "./routes/GoogleAuthRedirect";
import Food from "./routes/account/food";
import DailyFood from "./routes/account/daily-food";
import React, { useEffect } from "react";
import { AxiosInstance } from "./modules/req.js";
import { DarkTheme } from "./Themes/DarkTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Footer from "./Components/Footer";
import axios from "axios";


function App() {
  const [token, setToken] = useLocalStorage("token", undefined);
  axios.defaults.withCredentials = true;

  if (token === undefined) {
    return (
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Navbar token={token} />}>
              <Route path="/" element={<Footer />}>
                <Route
                  index
                  element={<Home setToken={setToken} token={token} />}
                />

                <Route path="auth/redirect" element={<GoogleAuthRedirect setToken={setToken} token={token} />} />

                <Route path="user/">
                  <Route
                    path="login"
                    element={<Login setToken={setToken} token={token} />}
                  />

                  <Route path="forgot-password/">
                    <Route index element={<ForgotPassword token={token} />} />

                    <Route path="reset/">
                      <Route index element={<ResetPassword token={token} />} />
                      <Route
                        path=":resetToken"
                        element={<ResetPassword token={token} />}
                      />
                    </Route>
                  </Route>
                </Route>

                <Route path="account/">
                  <Route
                    path="logout"
                    element={<Logout setToken={setToken} />}
                  />
                  <Route
                    path="create"
                    element={<Signup setToken={setToken} token={token} />}
                  />
                  <Route path="verify-email/">
                    <Route index element={<VerifyEmail />} />
                    <Route
                      path=":verificationToken"
                      element={<VerifyEmail />}
                    />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound token={token} />} />
              </Route>
            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline>
        <Routes>
          <Route path="/" element={<Navbar token={token} />}>
            <Route path="/" element={<Footer />}>
              <Route
                index
                element={<AccountHome token={token} setToken={setToken} />}
              />

              <Route path="auth/redirect" element={<GoogleAuthRedirect setToken={setToken} token={token} />} />

              <Route path="account/">
                <Route path="settings/">
                  <Route index element={<AccountSettings token={token} />} />
                  <Route
                    path=":setting"
                    element={<AccountSettings token={token} />}
                  />
                </Route>

                <Route path="verify-email/">
                  <Route index element={<VerifyEmail />} />
                  <Route path=":verificationToken" element={<VerifyEmail />} />
                </Route>

                <Route
                  path="home"
                  element={<AccountHome token={token} setToken={setToken} />}
                />

                <Route path="logout" element={<Logout setToken={setToken} />} />
              </Route>

              <Route path="user/">
                <Route
                  path="login"
                  element={<Login setToken={setToken} token={token} />}
                />

                <Route path="forgot-password/reset/">
                  <Route index element={<ResetPassword token={token} />} />
                  <Route
                    path=":resetToken"
                    element={<ResetPassword token={token} />}
                  />
                </Route>
              </Route>

              <Route path="profile/">
                <Route index element={<Profile token={token} />} />
                <Route path=":userId" element={<Profile token={token} />} />
              </Route>

              <Route path="food/">
                <Route index element={<Food token={token} />} />
              </Route>

              <Route path="*" element={<NotFound token={token} />} />
            </Route>
          </Route>
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

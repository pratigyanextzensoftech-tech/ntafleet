import ComingSimple from '../Components/Pages/ComingSoon/ComingSimple';
import CreatePwd from '../Components/Pages/Auth/CreatePwd';
import ForgetPwd from '../Components/Pages/Auth/ForgetPwd';
import LoginOne from '../Components/Pages/Auth/LoginOne';
import LoginTwo from '../Components/Pages/Auth/LoginTwo';
import LoginValidation from '../Components/Pages/Auth/LoginValidation';
import Maintenance from '../Components/Pages/Auth/Maintenance';
import RegisterSimple from '../Components/Pages/Auth/RegisterSimple';
import RegisterBgImg from '../Components/Pages/Auth/RegisterBgImg';
import RegisterVideo from '../Components/Pages/Auth/RegisterVideo';
import UnlockUser from '../Components/Pages/Auth/UnlockUser';
import Error400 from '../Components/Pages/ErrorPages/ErrorPage400';
import Error401 from '../Components/Pages/ErrorPages/ErrorPage401';
import Error403 from '../Components/Pages/ErrorPages/ErrorPage403';
import Error404 from '../Components/Pages/ErrorPages/ErrorPage404';
import Error500 from '../Components/Pages/ErrorPages/ErrorPage500';
import Error503 from '../Components/Pages/ErrorPages/ErrorPage503';

export const authRoutes = [
  { path: "/pages/authentication/login-simple", Component: <LoginOne /> },
  { path: "/pages/authentication/login-bg-img", Component: <LoginTwo /> },
  { path: "/pages/authentication/login-validation", Component: <LoginValidation /> },
  { path: "/pages/authentication/register-simple", Component: <RegisterSimple /> },
  { path: "/pages/authentication/register-bg-img", Component: <RegisterBgImg /> },
  { path: "/pages/authentication/register-video", Component: <RegisterVideo /> },
  { path: "/pages/authentication/unlock-user", Component: <UnlockUser /> },
  { path: "/pages/authentication/forget-pwd", Component: <ForgetPwd /> },
  { path: "/pages/authentication/create-pwd", Component: <CreatePwd /> },
  { path: "/pages/authentication/maintenance", Component: <Maintenance /> },
  { path: "/pages/comingsoon/comingsoon", Component: <ComingSimple /> },
  { path: "/pages/errors/error400", Component: <Error400 /> },
  { path: "/pages/errors/error401", Component: <Error401 /> },
  { path: "/pages/errors/error403", Component: <Error403 /> },
  { path: "/pages/errors/error404", Component: <Error404 /> },
  { path: "/pages/errors/error500", Component: <Error500 /> },
  { path: "/pages/errors/error503", Component: <Error503 /> },
];

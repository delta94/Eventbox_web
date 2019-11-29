import Loadable from 'react-loadable';
import Loading from 'dan-components/Loading';

// Menu page
export const HomePage = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
});
export const MatchsPage = Loadable({
  loader: () => import('./Matchs'),
  loading: Loading,
});
export const ExplorePage = Loadable({
  loader: () => import('./Explore'),
  loading: Loading,
});
export const MessagePage = Loadable({
  loader: () => import('./Message'),
  loading: Loading,
});
export const PressPage = Loadable({
  loader: () => import('./Press'),
  loading: Loading,
});
export const ContactPage = Loadable({
  loader: () => import('./Contact'),
  loading: Loading,
});
export const ProfilePage = Loadable({
  loader: () => import('./Profile'),
  loading: Loading,
});

// Auth pages
export const Login = Loadable({
  loader: () => import('./Auth/Login'),
  loading: Loading,
});
export const Register = Loadable({
  loader: () => import('./Auth/Register'),
  loading: Loading,
});
export const ResetPassword = Loadable({
  loader: () => import('./Auth/ResetPassword'),
  loading: Loading,
});
export const RegisterSuccess = Loadable({
  loader: () => import('./Auth/RegisterSuccess'),
  loading: Loading,
});
export const InvalidToken = Loadable({
  loader: () => import('./Auth/InvalidToken'),
  loading: Loading,
});

// Generic
export const ComingSoon = Loadable({
  loader: () => import('./Generic/ComingSoon'),
  loading: Loading,
});
export const NotFound = Loadable({
  loader: () => import('./Generic/NotFound'),
  loading: Loading,
});
export const NotFoundPage = Loadable({
  loader: () => import('./Generic/NotFound/NotFoundPage'),
  loading: Loading,
});
export const Error = Loadable({
  loader: () => import('./Generic/Error'),
  loading: Loading,
});
export const Maintenance = Loadable({
  loader: () => import('./Generic/Maintenance'),
  loading: Loading,
});
export const Settings = Loadable({
  loader: () => import('./Generic/Settings'),
  loading: Loading,
});
export const HelpSupport = Loadable({
  loader: () => import('./Generic/HelpSupport'),
  loading: Loading,
});

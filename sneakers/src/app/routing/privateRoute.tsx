export {}
// import React from 'react';
// import { Route, Redirect, RouteProps } from 'react-router-dom';
// import { useAuth } from '../../components/Navbar/index';

// interface PrivateRouteProps extends RouteProps {
//   component: React.ComponentType<any>;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

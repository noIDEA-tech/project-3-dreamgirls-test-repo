// //revised 3.23.25 njw
import "./App.css";
import { Outlet } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// Import your components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import auth service
import Auth from './utils/auth';

// Create an HTTP link for Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create an auth link to add token to requests
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage
  const token = Auth.getToken();
  // Return the headers with the token if it exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;


// import "./App.css";
// import { Outlet } from "react-router-dom";
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });
// // Import your page components here (create placeholder components for now)

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Map from "./components/Map/MapView.js";
// import Review from "./components/Review/ReviewForm.js";
// import ReviewList from "./components/ReviewList/ReviewList";

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <div className="add-your-css-here">
//         <Header />
//           <div className="main-content">
//             <Map />
//             <Review location={{
//              lng: -98.5795, 
//              lat: 39.8283, 
//             address: "Select a location on the map"
//           }} />
//             <ReviewList />
//           </div>
//         {/* add the css styling */}
//         <Outlet />
//         <Footer />
//       </div>
//     </ApolloProvider>
//   );
// };

// export default App;






// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { ApolloClientProvider } from './api/API';

// // // Import your page components here (create placeholder components for now)
// // const Home = () => <div>Home Page</div>;
// // const Login = () => <div>Login Page</div>;
// // const Signup = () => <div>Signup Page</div>;
// // const ReviewDetail = () => <div>Review Detail Page</div>;
// // const NotFound = () => <div>404 Page Not Found</div>;

// // function App() {
// //   return (
// //     <ApolloClientProvider>
// //       <Router>
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />
// //           <Route path="/report/:id" element={<ReviewDetail />} />
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </Router>
// //     </ApolloClientProvider>
// //   );
// // }

// // export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClientProvider } from './api/API';

// Import your page components here (create placeholder components for now)
const Home = () => <div>Home Page</div>;
const Login = () => <div>Login Page</div>;
const Signup = () => <div>Signup Page</div>;
const ReviewDetail = () => <div>Review Detail Page</div>;
const NotFound = () => <div>404 Page Not Found</div>;

function App() {
  return (
    <ApolloClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/report/:id" element={<ReviewDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ApolloClientProvider>
  );
}

export default App;
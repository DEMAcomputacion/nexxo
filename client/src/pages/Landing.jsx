import { Link } from 'react-router';

function Landing() {
  return (
    <div className="min-h-screen">
      <h1>NEXXO - Landing Page</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Landing;

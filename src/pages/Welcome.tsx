import { Link } from "react-router-dom";

export default function WeclomePage() {
  return (
    <div>
      <h1>Welcome Page</h1>
      <Link className="m-3 block" to="/auth/player/login">
        login player
      </Link>
      <Link className="m-3 block" to="/auth/admin/login">
        login admin
      </Link>
      <Link className="m-3 block" to="/auth/trainer/login">
        login trainer
      </Link>
      <Link to="/register">register</Link>
    </div>
  );
}

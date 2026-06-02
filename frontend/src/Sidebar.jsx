import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        Extensio.ai
      </h1>

      <ul className="space-y-4">
        <li>
          <Link
            to="/dashboard"
            className="block p-3 bg-slate-800 rounded-lg"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/generate"
            className="block p-3 hover:bg-slate-800 rounded-lg"
          >
            Generate Extension
          </Link>
        </li>

        <li>
          <Link
            to="/extensions"
            className="block p-3 hover:bg-slate-800 rounded-lg"
          >
            My Extensions
          </Link>
        </li>

        <li>
          <Link
            to="/analytics"
            className="block p-3 hover:bg-slate-800 rounded-lg"
          >
            Analytics
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="block p-3 hover:bg-slate-800 rounded-lg"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
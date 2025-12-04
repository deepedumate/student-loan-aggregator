import { Outlet } from "react-router-dom";
import Sidebar from "../components/student/Sidebar";
import HeaderBar from "../components/student/HeaderBar";

export default function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header will be customized per page via context or props */}
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

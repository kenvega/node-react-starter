import { Outlet } from "react-router";

import Sidebar from "./components/sidebar";

export default function SidebarLayout() {
  return (
    // Root's <main> stretches its direct children into a flex column, so the
    // sidebar row lives one level down.
    <div>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col [&>*]:flex [&>*]:flex-1 [&>*]:flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

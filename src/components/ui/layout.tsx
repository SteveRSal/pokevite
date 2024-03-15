import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div role="layout" className="h-svh w-svw">
      <Outlet />
    </div>
  );
}

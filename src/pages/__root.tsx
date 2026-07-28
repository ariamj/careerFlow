import { createRootRoute, Outlet } from "@tanstack/react-router";
import NavBar from "../components/NavBar";

export const Route = createRootRoute({
    component: () => (
        <div className="flexbg-slate-50 text-slate-800 antialiased font-sans">
            <NavBar />
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    )
})
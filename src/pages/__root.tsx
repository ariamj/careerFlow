import { createRootRoute, Outlet } from "@tanstack/react-router";
import NavBar from "../components/NavBar";

export const Route = createRootRoute({
    component: () => (
        <div className="bg-secondary text-slate-800 antialiased font-sans">
            <NavBar />
            <main className="overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    )
})
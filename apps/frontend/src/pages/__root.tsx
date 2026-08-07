import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <div className="bg-secondary text-slate-800 antialiased font-sans">
            <NavBar />
            <main className="overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    )
})
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import type { QueryClient } from "@tanstack/react-query";
import { NeonAuthUIProvider } from '@neondatabase/auth-ui';
import { authClient } from "@/lib/auth";
import AuthNavBar from "@/components/AuthNavBar";

interface MyRouterContext {
    queryClient: QueryClient
}

function RootContent() {
    const { data: session, isPending } = authClient.useSession()

    if (isPending) {
        return null
    }

    return (
        <div className="bg-secondary text-slate-800 antialiased font-sans">
            {session ? <NavBar /> : <AuthNavBar />}
            <main className="min-h-full overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <NeonAuthUIProvider
            authClient={authClient}
            social={{ providers: ['google', 'github']}}
        >
            <RootContent />
        </NeonAuthUIProvider>
    )
})
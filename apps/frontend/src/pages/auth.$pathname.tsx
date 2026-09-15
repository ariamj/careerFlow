import { createFileRoute } from "@tanstack/react-router";
import { AuthView } from "@neondatabase/auth-ui";

function Auth() {
    const { pathname } = Route.useParams();
    return (
        <div className="flex justify-center align-center min-h-full">
            <AuthView pathname={pathname} />
        </div>
    )
}

export const Route = createFileRoute('/auth/$pathname')({
    component: Auth,
})
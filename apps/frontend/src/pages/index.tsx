import { authClient } from '@/lib/auth'
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@neondatabase/auth-ui'
import { createFileRoute, redirect } from '@tanstack/react-router'

function Home() {
    const { data } = authClient.useSession()

    return (
        <>
            <SignedIn>
                <div className="flex flex-col justify-center align-center min-h-full gap-2">
                    <div className="text-center">
                        <h1>Welcome!</h1>
                        <p>You're sucessfully authenticated.</p>
                        <UserButton />
                        <p className="font-medium text-gray-700 dark:text-gray-200 mt-4">
                            Session and User Data:
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap break-words w-full max-w-full sm:max-w-2xl mx-auto text-left">
                            <code>
                                {JSON.stringify({ session: data?.session, user: data?.user }, null, 2)}
                            </code>
                        </pre>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    )
}

export const Route = createFileRoute('/')({
    // beforeLoad: () => {
    //     throw redirect({ to: '/Dashboard' })
    // },
    component: Home,
})
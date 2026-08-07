import { applicationQueryOptions } from "@/utils/queries"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

function ApplicationView() {
    const {data: data} = useQuery(applicationQueryOptions)
    const {applicationId} = Route.useParams()

    return (
        <div>View Application Details for application id: {applicationId}</div>
    )
}

export const Route = createFileRoute('/Applications/$applicationId')({
    loader: async ({ params, context: { queryClient } }) => {
        const { applicationId } = params

        return queryClient
            .ensureQueryData(applicationQueryOptions)
            .then((applications) => {
                const application = applications.find((app) => app.id === applicationId)
                if (!application) {
                    throw new Error(`Application with ID ${applicationId} not found`)
                }
                return application
            })
            .catch((err) => {
                console.error("The loader for the Application view route failed to fetch data:", err)
                // throw err; // Re-throw the error to propagate it to the route's error boundary
                return null; // Return null to allow the component to render without crashing
            })
    },
    component: ApplicationView,
})
import { ApplicationForm } from "@/components/applicationForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getApplicationsData, testQuery } from "@/services/queries"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

function ApplicationView() {
    const {data: applicationsData} = useQuery(getApplicationsData)
    const {applicationId} = Route.useParams()
    const {data: testData} = useQuery(testQuery)

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Application Details for application id: {applicationId}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ApplicationForm />
                </CardContent>
            </Card>
        </div>
    )
}

export const Route = createFileRoute('/Applications/$applicationId')({
    loader: async ({ params, context: { queryClient } }) => {
        const { applicationId } = params

        await queryClient.ensureQueryData(testQuery)

        return queryClient
            .ensureQueryData(getApplicationsData)
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
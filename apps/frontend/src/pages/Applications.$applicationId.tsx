import { getApplicationsData, testQuery } from "@/services/queries"
import { INTEREST_LEVEL_OPTIONS } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

function ApplicationView() {
    const {data: applicationsData} = useQuery(getApplicationsData)
    const {applicationId} = Route.useParams()
    const {data: testData} = useQuery(testQuery)

    return (
        <div>
            View Application Details for application id: {applicationId}
            <div>
                {testData ? (
                    <div>
                        <h2>Test Data</h2>
                        <pre>{JSON.stringify(testData, null, 2)}</pre>
                    </div>
                ) : (
                    <p>Loading test data...</p>
                )}
            </div>
            <div>
                {applicationsData ? (
                    <div>
                        <h2>Applications Data</h2>
                        <pre>{JSON.stringify(applicationsData, null, 2)}</pre>
                    </div>
                ) : (
                    <p>Loading test data...</p>
                )}
            </div>
            <div>
                {applicationsData ? (
                    <div>
                        <h2>Type Keys</h2>
                        <pre>{JSON.stringify(Object.keys(INTEREST_LEVEL_OPTIONS), null, 2)}</pre>
                        <pre>{typeof [...Object.keys(INTEREST_LEVEL_OPTIONS)]}</pre>
                        <pre>{typeof ['LOW', 'MEDIUM', 'HIGH']}</pre>
                    </div>
                ) : (
                    <p>Loading test data...</p>
                )}
            </div>
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
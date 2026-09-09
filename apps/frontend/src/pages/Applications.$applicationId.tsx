import { ApplicationForm } from "@/components/applicationForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getApplicationById, testQuery } from "@/services/queries"
import type { Application } from "@/utils/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import React from "react"

function ApplicationView() {
    const queryClient = useQueryClient();
    const {applicationId} = Route.useParams()
    const {data: application} = useQuery(getApplicationById(applicationId))
    // const {data: testData} = useQuery(testQuery)

    const EDIT_FORM_ID = "edit-application-form"
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const updateApplication = useMutation({
        mutationFn: async (payload: Partial<Application>) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok. Failed to update application.')
            }
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applications", applicationId] })
        },
        onError: (error) => {
            console.error("Mutation error - Error updating application:", error)
        }
    })

    const handleFormUpdate = (updatedData: Record<string, unknown>, dirtyFields: Record<string, boolean | undefined>) => {
        setIsSubmitting(true)

        try {
            const dirtyPayload = Object.keys(dirtyFields).reduce((acc, key) => {
                const field = key as keyof Application
                acc[field] = updatedData[field] as any
                return acc
            }, {} as Partial<Application>);

            updateApplication.mutate(dirtyPayload);
        } catch (error) {
            console.error("Error updating application:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Application Details for application id: {applicationId}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ApplicationForm formId={EDIT_FORM_ID} onSubmit={handleFormUpdate} application={application} />
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button
                        type="submit"
                        form={EDIT_FORM_ID}
                        disabled={isSubmitting || updateApplication.isPending}
                        className="cursor-pointer"
                    >
                        {updateApplication.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export const Route = createFileRoute('/Applications/$applicationId')({
    loader: async ({ params, context: { queryClient } }) => {
        const { applicationId } = params

        await queryClient.ensureQueryData(testQuery)

        return queryClient
            .ensureQueryData(getApplicationById(applicationId))
            .catch((err) => {
                console.error("The loader for the Application view route failed to fetch data:", err)
                // throw err; // Re-throw the error to propagate it to the route's error boundary
                return null; // Return null to allow the component to render without crashing
            })
    },
    component: ApplicationView,
})
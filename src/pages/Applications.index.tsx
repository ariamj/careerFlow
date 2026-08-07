import { createFileRoute, Outlet } from '@tanstack/react-router'
import { columns } from '@/components/columns'
import { applicationQueryOptions } from '@/utils/queries'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DataTable } from '@/components/dataTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { STATUS_OPTIONS } from '@/utils/types'

function ApplicationsPage() {
    const queryClient = useQueryClient()
    const {data: data} = useQuery(applicationQueryOptions)

    const updateData = useMutation({
        mutationFn: (updated: {
            id: string;
            company: string
            position: string
            workMode: string
            interest: string
        }) => {
            return fetch(`/api/applications/${updated.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updated),
            }).then((res) => res.json())
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['applications']})
        },
    })

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card key="total-applications" className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-bold text-lg">Total Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center flex-1">
                        <div className="text-3xl font-semibold">{data?.length ?? 0}</div>
                    </CardContent>
                </Card>
                <Card key="applied" className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-bold text-lg">Applied</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center flex-1">
                        <div className="text-3xl font-semibold">
                            {data?.filter((application) => application.status.includes(STATUS_OPTIONS.APPLIED))?.length ?? 0}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="p-6">
                <DataTable
                    columns={columns}
                    data={data? data : []}
                />
            </Card>
        </div>
    )
}

export const Route = createFileRoute('/Applications/')({
    loader: async ({ context: { queryClient } }) => {
        return queryClient
            .ensureQueryData(applicationQueryOptions)
            .catch((err) => {
                console.error("The loader for the Applications route failed to fetch data:", err);
                // throw err; // Re-throw the error to propagate it to the route's error boundary
                return []; // Return an empty array to allow the component to render without crashing
            })
    },
    component: ApplicationsPage,
})
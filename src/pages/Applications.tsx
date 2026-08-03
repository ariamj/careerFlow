import { createFileRoute } from '@tanstack/react-router'
import { DataTable } from '@/components/dataTable'
import { columns } from '@/components/columns'
import { applicationQueryOptions } from '@/utils/queries'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-card p-5 text-card-foreground shadow-sm ring-1 ring-border">
                    <div className="text-sm uppercase tracking-[0.2em]">Total Applications</div>
                    <div className="mt-2 text-3xl font-semibold">{data?.length ?? 0}</div>
                </div>
            </div>
            <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-sm ring-1 ring-border">
                <DataTable
                    columns={columns}
                    data={data? data : []}
                />
            </div>
        </div>
    )
}

export const Route = createFileRoute('/Applications')({
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
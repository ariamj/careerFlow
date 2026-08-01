import { createFileRoute } from '@tanstack/react-router'
import { fetchApplications } from '../services/dataApi'
import { DataTable } from '@/components/dataTable'
import { columns } from '@/components/columns'

function ApplicationsPage() {
    const data = Route.useLoaderData()

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-300">Records</div>
                    <div className="mt-2 text-3xl font-semibold">50</div>
                </div>
            </div>
            <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-sm ring-1 ring-border">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}

export const Route = createFileRoute('/Applications')({
    loader: () => fetchApplications(),
    component: ApplicationsPage,
})
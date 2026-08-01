import { columns } from '@/components/columns'
import { DataTable } from '@/components/dataTable'
import { fetchApplications } from '@/services/dataApi'
import { createFileRoute } from '@tanstack/react-router'

function PostingArchivePage() {
    const data = Route.useLoaderData()

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export const Route = createFileRoute('/PostingArchive')({
    loader: () => fetchApplications(),
    component: PostingArchivePage,
})
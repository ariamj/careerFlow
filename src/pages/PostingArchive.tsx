import { columns, type Application } from '@/components/columns'
import { DataTable } from '@/components/dataTable'
import { createFileRoute } from '@tanstack/react-router'

async function getData(): Promise<Application[]> {
    // fetch data from API or database
    return [
        {
            id: "1",
            company: "Company A",
            position: "SDE",
            status: "Shortlisted"
        },
        {
            id: "2",
            company: "Company B",
            position: "Web Developer",
            status: "Applied"
        },
    ]
}

async function PostingArchivePage() {
    const data = await getData()

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export const Route = createFileRoute('/PostingArchive')({
    component: PostingArchivePage,
})
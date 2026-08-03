import { columns } from '@/components/columns';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { fetchApplications } from '@/services/dataApi';
import { INTEREST_LEVEL_OPTIONS } from '@/utils/types';
import { createFileRoute } from '@tanstack/react-router'
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';

function DashboardPage() {
    const data = Route.useLoaderData()
    const table = useReactTable({
        data: data.filter((application) => application.interest === INTEREST_LEVEL_OPTIONS.HIGH),
        columns: columns.filter((column) => {
            return (column.id === "company" || column.id === "position" || column.id === "workMode")
        }),
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-2xl font-bold bg-card text-card-foreground shadow-sm ring-1 ring-border p-4 rounded-md">
                    <div>
                        Top Shortlist
                    </div>
                    <ScrollArea className="h-72 rounded-md">
                        <Table>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
                <div className="text-2xl font-bold bg-card text-card-foreground shadow-sm ring-1 ring-border p-4 rounded-md">
                    Total Applications
                    <div className="mt-2 text-3xl font-semibold">{data.length}</div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="text-2xl font-bold bg-card text-card-foreground shadow-sm ring-1 ring-border p-4 rounded-md">
                    Tracking Sites
                </div>
            </div>
        </div>
    )
}


export const Route = createFileRoute('/Dashboard')({
    loader: () => fetchApplications(),
    component: DashboardPage,
});
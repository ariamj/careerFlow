import { columns } from '@/components/columns';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { applicationQueryOptions } from '@/utils/queries';
import { INTEREST_LEVEL_OPTIONS } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useMemo } from 'react';

function DashboardPage() {
    const {data: data} = useQuery(applicationQueryOptions)

    const filteredData = useMemo(() => {
        return data?.filter((application) => application.interest?.value === INTEREST_LEVEL_OPTIONS.HIGH.value) ?? [];
    }, [data])

    const table = useReactTable({
        data: filteredData ?? [],
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
                    <div className="mt-2 text-3xl font-semibold">{data?.length ?? 0}</div>
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
    loader: async ({ context: { queryClient } }) => {
        return queryClient
            .ensureQueryData(applicationQueryOptions)
            .catch((err) => {
                console.error("The loader for the Applications route failed to fetch data:", err);
                // throw err; // Re-throw the error to propagate it to the route's error boundary
                return []; // Return an empty array to allow the component to render without crashing
            })
    },
    component: DashboardPage,
});
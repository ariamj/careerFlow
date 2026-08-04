import { columns } from '@/components/columns';
import { DataTable } from '@/components/dataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { applicationQueryOptions } from '@/utils/queries';
import { INTEREST_LEVEL_OPTIONS, STATUS_OPTIONS } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react';

function DashboardPage() {
    const {data: data} = useQuery(applicationQueryOptions)
    const filteredData = useMemo(() => {
        return data?.filter((application) => application.interest?.value === INTEREST_LEVEL_OPTIONS.HIGH.value) ?? [];
    }, [data])

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <Card className="text-xl font-bold bg-card text-card-foreground shadow-sm ring-1 ring-border p-4 rounded-md">
                    <CardHeader>
                        <CardTitle className="font-bold text-lg">Top Shortlist</CardTitle>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing)">
                        <ScrollArea className="h-72 rounded-md flex-2 flex items-center mt-2 text-3xl font-semibold -mx-(--card-spacing)">
                            <DataTable
                                columns={columns.filter((column) => {
                                    return (column.id === "company" || column.id === "position" || column.id === "workMode")
                                })}
                                data={filteredData}
                                header={false}
                                searchBar={false}
                                pagination={false}
                            />
                        </ScrollArea>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <Card className="flex flex-col mx-auto w-full max-w-xs">
                        <CardHeader>
                            <CardTitle className="font-bold text-lg">Total Applications</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center items-center flex-1">
                            <div className="text-3xl font-semibold">{data?.length ?? 0}</div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col mx-auto w-full max-w-xs">
                        <CardHeader>
                            <CardTitle className="font-bold text-lg">Applied</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center items-center flex-1">
                            <div className="text-3xl font-semibold">
                                {data?.filter((application) => application.status.includes(STATUS_OPTIONS.APPLIED))?.length ?? 0}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col mx-auto w-full max-w-xs">
                        <CardHeader>
                            <CardTitle className="font-bold text-lg">Shortlisted</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center items-center flex-1">
                            <div className="text-3xl font-semibold">
                                {data?.filter((application) => application.status.includes(STATUS_OPTIONS.SHORTLISTED))?.length ?? 0}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col mx-auto w-full max-w-xs">
                        <CardHeader>
                            <CardTitle className="font-bold text-lg">Rejected</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center items-center flex-1">
                            <div className="text-3xl font-semibold">
                                {data?.filter((application) => application.status.includes(STATUS_OPTIONS.REJECTED))?.length ?? 0}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold text-lg">Company Application Tracking Sites</CardTitle>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing)">
                        <ScrollArea className="h-72 rounded-md flex-2 flex items-center mt-2 text-3xl font-semibold">
                            <DataTable
                                columns={columns.filter((column) => {
                                    return (column.id === "company" || column.id === "position" || column.id === "workMode")
                                })}
                                data={filteredData}
                                header={false}
                                searchBar={false}
                                pagination={false}
                            />
                        </ScrollArea>
                    </CardContent>
                </Card>
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
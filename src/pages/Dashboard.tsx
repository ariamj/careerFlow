import { columns } from '@/components/columns';
import { DataTable } from '@/components/dataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { applicationQueryOptions } from '@/utils/queries';
import { INTEREST_LEVEL_OPTIONS, STATUS_OPTIONS } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';

function DashboardPage() {
    const {data: data} = useQuery(applicationQueryOptions)
    const filteredData = useMemo(() => {
        return data?.filter((application) => application.interest?.value === INTEREST_LEVEL_OPTIONS.HIGH.value) ?? [];
    }, [data])

    const { width, containerRef, mounted } = useContainerWidth();
    const layouts = {
        lg: [
            { i: "top-shortlist", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
            { i: "total-applications", x: 2, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "applied", x: 3, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "shortlisted", x: 2, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "rejected", x: 3, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "company-app-sites", x: 0, y: 2, w: 4, h: 2.5, minW: 4, minH: 2 },
        ],
        md: [
            { i: "top-shortlist", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
            { i: "total-applications", x: 2, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "applied", x: 3, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "shortlisted", x: 2, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "rejected", x: 3, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "company-app-sites", x: 0, y: 2, w: 4, h: 2.5, minW: 4, minH: 2 },
        ],
        sm: [
            { i: "top-shortlist", x: 0, y: 2, w: 2, h: 2, minW: 2, minH: 2 },
            { i: "total-applications", x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "applied", x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "shortlisted", x: 0, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "rejected", x: 1, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
            { i: "company-app-sites", x: 0, y: 3, w: 2, h: 2.5, minW: 2, minH: 2 },
        ],
        xs: [
            { i: "top-shortlist", x: 0, y: 0, w: 2, h: 2, static: true },
            { i: "total-applications", x: 0, y: 0, w: 1, h: 1, static: true },
            { i: "applied", x: 0, y: 1, w: 1, h: 1, static: true },
            { i: "shortlisted", x: 0, y: 2, w: 1, h: 1, static: true },
            { i: "rejected", x: 0, y: 3, w: 1, h: 1, static: true },
            { i: "company-app-sites", x: 0, y: 5, w: 1, h: 2.5, static: true },
        ],
    }

    return (
        <div>
            <div ref={containerRef}>
                {mounted && (
                    <Responsive
                        layouts={layouts}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
                        cols={{ lg: 4, md: 4, sm: 2, xs: 1 }}
                        width={width}
                    >
                        <Card key="top-shortlist" className="text-xl font-bold">
                            <CardHeader>
                                <CardTitle className="font-bold text-lg">Top Shortlist</CardTitle>
                            </CardHeader>
                            <CardContent className="-mb-(--card-spacing)">
                                <ScrollArea className="h-100 flex-2 flex items-center">
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
                        <Card key="shortlisted" className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="font-bold text-lg">Shortlisted</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-center items-center flex-1">
                                <div className="text-3xl font-semibold">
                                    {data?.filter((application) => application.status.includes(STATUS_OPTIONS.SHORTLISTED))?.length ?? 0}
                                </div>
                            </CardContent>
                        </Card>
                        <Card key="rejected" className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="font-bold text-lg">Rejected</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-center items-center flex-1">
                                <div className="text-3xl font-semibold">
                                    {data?.filter((application) => application.status.includes(STATUS_OPTIONS.REJECTED))?.length ?? 0}
                                </div>
                            </CardContent>
                        </Card>
                        <Card key="company-app-sites">
                            <CardHeader>
                                <CardTitle className="font-bold text-lg">Company Application Tracking Sites</CardTitle>
                            </CardHeader>
                            <CardContent className="-mb-(--card-spacing)">
                                <ScrollArea className="h-72 rounded-md flex-2 flex items-center">
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
                    </Responsive>
                )}
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
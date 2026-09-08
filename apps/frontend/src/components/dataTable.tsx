"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type PaginationState,
    type SortingState
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput
} from "@/components/ui/input-group";
import { PlusIcon, SearchIcon, XIcon } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import { ApplicationForm } from "./applicationForm";
import { ScrollArea } from "./ui/scroll-area";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    header?: boolean
    searchBar?: boolean
    pagination?: boolean
    buttons?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    header = true,
    searchBar = true,
    pagination = true,
    buttons = false,
}: DataTableProps<TData, TValue>) {
    const [open, setOpen] = React.useState(false)
    const queryClient = useQueryClient();
    const [pageSize, setPageSize] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    })
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState<any>([])
    const FORM_ID = "new-application-form"
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPageSize,
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        globalFilterFn: "includesString",
        onGlobalFilterChange: setGlobalFilter,
        state: {
            pagination: pageSize,
            sorting,
            rowSelection,
            globalFilter
        },
    })

    const createApplication = useMutation({
        mutationFn: async (formData: any) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applications"] })
            setOpen(false)
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        }
    })

    const handleFormSubmit = (formData: Record<string, unknown>) => {
        setIsSubmitting(true)

        try {
            createApplication.mutate(formData);
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <div className="flex">
                {searchBar && (
                    <div className="flex flex-1 items-center py-4">
                        <InputGroup className="max-w-sm">
                            <InputGroupInput
                                placeholder="Search applications..."
                                value={table.getState().globalFilter ?? ""}
                                onChange={(event) => table.setGlobalFilter(String(event.target.value))}
                            />
                            <InputGroupAddon align="inline-start">
                                <SearchIcon className="text-muted-foreground" />
                            </InputGroupAddon>
                            {table.getFilteredRowModel().rows.length === table.getCoreRowModel().rows.length ? null : (
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        onClick={() => table.resetGlobalFilter()}
                                        className="rounded-full cursor-pointer p-1"
                                    >
                                        <XIcon />
                                        <span className="sr-only">Clear filters</span>
                                    </InputGroupButton>
                                </InputGroupAddon>
                            )}
                            <InputGroupAddon align="inline-end">
                                {
                                    table.getFilteredRowModel().rows.length === table.getCoreRowModel().rows.length
                                    ? ""
                                    : `${table.getFilteredRowModel().rows.length} results`
                                }
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                )}
                {buttons && (
                    <div className="ml-auto py-4">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <form>
                                <DialogTrigger
                                    render={<Button variant="default" className="cursor-pointer"><PlusIcon /></Button>}
                                />
                                <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-3xl">
                                    <ScrollArea className="h-[80vh] overflow-y-auto -mx-3.5 px-4">
                                        <DialogHeader>
                                            <DialogTitle>New Application</DialogTitle>
                                            <DialogDescription>Track a new application. Click create when done.</DialogDescription>
                                        </DialogHeader>
                                        <ApplicationForm formId={FORM_ID} onSubmit={handleFormSubmit} />
                                    </ScrollArea>
                                    <DialogFooter>
                                        <DialogClose
                                            render={<Button className="cursor-pointer">Cancel</Button>}
                                        />
                                        <Button
                                            type="submit"
                                            form={FORM_ID}
                                            disabled={isSubmitting || createApplication.isPending}
                                            className="cursor-pointer"
                                        >
                                            {createApplication.isPending ? "Saving..." : "Create"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>
                    </div>
                )}
            </div>
            <div className="overflow-hidden rounded-md">
                <Table>
                    {header && (
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="bg-primary hover:bg-primary">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="text-bold text-primary-foreground">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                    )}
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
            </div>
            {pagination && (
                <div className="flex items-center justify-between py-4">
                    <div className="text-sm text-muted-foreground justify-start">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex-2 w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="items-center justify-end space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
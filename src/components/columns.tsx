"use client"

import type { ColumnDef } from '@tanstack/react-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from './ui/checkbox'

export type Application = {
    id: string
    company: string
    position: string
    status: "Shortlisted" | "Applied" | "Rejected"
}

export const columns: ColumnDef<Application>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomePageRowsSelected() &&
                    !table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "company",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <div className="text-left">{row.getValue("company")}</div>
            )
        }
    },
    {
        accessorKey: "position",
        header: "Position",
        cell: ({row}) => {
            return (
                <div className="text-left">{row.getValue("position")}</div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            return (
                <div className="text-left">{row.getValue("status")}</div>
            )
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const application = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        }>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => console.log("Edit application", application.id)}
                        >
                            Edit
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(application.id)}
                        >
                            Copy application ID
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
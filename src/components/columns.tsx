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
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from './ui/checkbox'
import { type Application, type InterestLevel, type Status, type WorkMode } from '@/utils/types'
import { Badge } from '@/components/ui/badge'

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
        id: "interest",
        accessorKey: "interest",
        header: "",
        cell: ({row}) => {
            const interest = row.getValue("interest") as InterestLevel

            return (
                <div className="text-left">
                    {interest? (
                        <Badge
                            variant="secondary"
                            style={{
                                '--bg-colour': interest.colour,
                                '--bg-colour-light': interest.lightColour ? interest.lightColour : interest.colour,
                                '--bg-colour-dark': interest.darkColour ? interest.darkColour : interest.colour
                            } as React.CSSProperties}
                            className="bg-[var(--bg-colour)] bg-[var(--bg-colour-light)] dark:bg-[var(--bg-colour-dark)]"
                        >
                            {interest.label}
                        </Badge>
                    ): (
                        <div className="text-muted-foreground">N/A</div>
                    )}
                </div>
            )
        }
    },
    {
        id: "company",
        accessorKey: "company",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer p-0 hover:bg-transparent hover:text-inherit"
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
        id: "position",
        accessorKey: "position",
        header: "Position",
        cell: ({row}) => {
            return (
                <div className="text-left">{row.getValue("position")}</div>
            )
        }
    },
    {
        id: "workMode",
        accessorKey: "workMode",
        header: "Work Mode",
        cell: ({row}) => {
            const workMode = row.getValue("workMode") as WorkMode
            return (
                <div className="text-left">
                    {workMode? (
                        <Badge
                            variant="secondary"
                            style={{
                                '--bg-colour': workMode.colour,
                                '--bg-colour-light': workMode.lightColour ? workMode.lightColour : workMode.colour,
                                '--bg-colour-dark': workMode.darkColour ? workMode.darkColour : workMode.colour
                            } as React.CSSProperties}
                            className="bg-[var(--bg-colour)] bg-[var(--bg-colour-light)] dark:bg-[var(--bg-colour-dark)]"
                        >
                            {workMode.label}
                        </Badge>
                    ): null}
                </div>
            )
        }
    },
    {
        id: "applyDate",
        accessorKey: "applyDate",
        header: "Date Applied",
        cell: ({row}) => {
            const applyDate = row.getValue("applyDate") as Date
            return (
                <div className="text-left">
                    {applyDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    })}
                </div>
            )
        }
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            const status_list = row.getValue("status") as Status[]
            return (
                <div className="text-left flex flex-wrap gap-1">
                    {status_list.map((status) => (
                        <Badge
                            variant="secondary"
                            key={status.value}
                            style={{
                                '--bg-colour': status.colour,
                                '--bg-colour-light': status.lightColour ? status.lightColour : status.colour,
                                '--bg-colour-dark': status.darkColour ? status.darkColour : status.colour
                            } as React.CSSProperties}
                            className="bg-[var(--bg-colour)] bg-[var(--bg-colour-light)] dark:bg-[var(--bg-colour-dark)]"
                        >
                            {status.label}
                        </Badge>
                    ))}
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const application = row.original

            return (
                <div className="flex justify-end space-x-1">
                    <Button
                        variant="ghost"
                        onClick={() => console.log("Edit application", application.id)}
                        className="rounded-full cursor-pointer p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Pencil />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full cursor-pointer">
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
                            <DropdownMenuItem
                                onClick={() => console.log("Delete application", application.id)}
                                className="text-destructive"
                            >
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]
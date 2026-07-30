import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { fetchCustomData, type CustomData } from '../services/dataApi'

function ApplicationsPage() {
    const [items, setItems] = useState<CustomData[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let active = true

        const loadData = async () => {
            setIsLoading(true)
            const result = await fetchCustomData(search, page)
            
            if (!active) {
                return
            }

            setItems(result.items)
            setTotalPages(result.totalPages || 1)
            setIsLoading(false)
        }

        loadData()

        return () => {
            active = false
        }
    }, [page, search])

    useEffect(() => {
        setPage(1)
    }, [search])

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-300">Records</div>
                    <div className="mt-2 text-3xl font-semibold">50</div>
                </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search applications..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 md:w-72"
                    />
                </div>
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Company</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Position</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {isLoading ? (
                                <tr>
                                    <td className="px-4 py-6 text-sm text-slate-500" colSpan={3}>
                                        Loading...
                                    </td>
                                </tr>
                            ) : items.length > 0 ? (
                                items.map((item) => (
                                    <tr key={item.id} className="transition hover:bg-slate-50">
                                        <td className="px-4 py-4 text-sm text-left font-medium text-slate-900">{item.company}</td>
                                        <td className="px-4 py-4 text-sm text-left text-slate-600">{item.position}</td>
                                        <td className="px-4 py-4 text-sm text-left text-slate-600">{item.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="px-4 py-6 text-sm text-slate-500" colSpan={3}>
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">
                        Page {page} of {totalPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                            disabled={page === 1 || isLoading}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                            disabled={page === totalPages || isLoading}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Route = createFileRoute('/Applications')({
    component: ApplicationsPage,
})
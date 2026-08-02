export type Application = {
    id: string
    company: string
    position: string
    workMode?: WorkMode | undefined
    applyDate?: Date | undefined
    status: Status[]
}

export type WorkMode = {
    label: string
    value: string
    colour: string
    lightColour?: string
    darkColour?: string
}

export type Status = {
    label: string
    value: string
    colour: string
    lightColour?: string
    darkColour?: string
}

export const WORK_MODE_OPTIONS = {
    REMOTE: {
        label: "Remote",
        value: "Remote",
        colour: "var(--notion-bg-green)",
    },
    ON_SITE: {
        label: "On Site",
        value: "On Site",
        colour: "var(--notion-bg-blue)",
    },
    HYBRID: {
        label: "Hybrid",
        value: "Hybrid",
        colour: "var(--notion-bg-purple)",
    }
}


export const STATUS_OPTIONS = {
    SHORTLISTED: {
        label: "Shortlisted",
        value: "Shortlisted",
        colour: "var(--notion-bg-yellow)",
    },
    APPLIED: {
        label: "Applied",
        value: "Applied",
        colour: "var(--notion-bg-blue)",
    },
    REJECTED: {
        label: "Rejected",
        value: "Rejected",
        colour: "var(--notion-bg-red)",
    }
}
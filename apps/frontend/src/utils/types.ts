export type Application = {
    id: string
    interest?: InterestLevel | undefined
    company: string
    position: string
    workMode?: WorkMode | undefined
    applyDate?: Date | undefined
    status: Status[]
}

export type InterestLevel = {
    label: string
    value: string
    colour: string
    lightColour?: string
    darkColour?: string
}

export const INTEREST_LEVEL_OPTIONS = {
    LOW: {
        label: "!",
        value: "low",
        colour: "var(--notion-bg-yellow)",
    },
    MEDIUM: {
        label: "!!",
        value: "medium",
        colour: "var(--notion-bg-pink)",
    },
    HIGH: {
        label: "!!!",
        value: "high",
        colour: "var(--notion-bg-red)",
    }
}

export type WorkMode = {
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

export type Status = {
    label: string
    value: string
    colour: string
    lightColour?: string
    darkColour?: string
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
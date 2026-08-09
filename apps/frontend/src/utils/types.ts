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
} as const;
export type InterestLevelKey = keyof typeof INTEREST_LEVEL_OPTIONS;
export type InterestLevelOption = (typeof INTEREST_LEVEL_OPTIONS)[InterestLevelKey];

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
} as const;
export type WorkModeKey = keyof typeof WORK_MODE_OPTIONS;
export type WorkModeOption = (typeof WORK_MODE_OPTIONS)[WorkModeKey];

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
} as const;
export type StatusKey = keyof typeof STATUS_OPTIONS;
export type StatusOption = (typeof STATUS_OPTIONS)[StatusKey];
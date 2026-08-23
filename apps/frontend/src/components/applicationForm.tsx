import * as React from "react"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { INTEREST_LEVEL_OPTIONS, STATUS_OPTIONS, WORK_MODE_OPTIONS } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { DatePickerInput } from "./ui/date-picker";
import { Button } from "./ui/button";
import { PlusIcon, XIcon } from "lucide-react";

export function ApplicationForm() {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([])
    const [links, setLinks] = React.useState<Record<string, string>[]>([])
    const [resumeFile, setResumeFile] = React.useState<File | null>(null)
    const [coverLetterFile, setCoverLetterFile] = React.useState<File | null>(null)
    const [files, setFiles] = React.useState<Record<string, string>[]>([])

    const interestLevelOptions = [
        {
            label: "Select interest level",
            value: null,
        },
        ...Object.values(INTEREST_LEVEL_OPTIONS).map((option) => ({
            label: option.label,
            value: option.value
        }))
    ]
    const workModeOptions = [
        {
            label: "Select work mode",
            value: null,
        },
        ...Object.values(WORK_MODE_OPTIONS).map((option) => ({
            label: option.label,
            value: option.value,
        }))
    ];
    const statusOptions = [
        ...Object.values(STATUS_OPTIONS).map((option) => ({
            label: option.label,
            value: option.value,
            style: {
                badgeColor: option.colour
            }
        }))
    ]

    const handleAddLink = () => {
        setLinks([...links, { id: crypto.randomUUID(), url: "" }])
    }
    const handleRemoveLink = (id: string) => {
        setLinks(links.filter((link) => link.id !== id))
    }
    const handleLinkChange = (id: string, url: string) => {
        setLinks(
            links.map((link) => (link.id === id ? { ...link, url } : link))
        )
    }

    const handleAddFile = () => {
        setFiles([...files, { id: crypto.randomUUID(), url: "" }])
    }
    const handleRemoveFile = (id: string) => {
        setFiles(files.filter((file) => file.id !== id))
    }
    const handleFileChange = (id: string, url: string) => {
        setFiles(
            files.map((file) => (file.id === id ? { ...file, url } : file))
        )
    }

    return (
        <FieldGroup>
            <Field className="w-[50%] md:w-[25%]">
                <FieldLabel htmlFor="interest-level">Interest Level</FieldLabel>
                <Select items={interestLevelOptions} id="interest-level">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                            {interestLevelOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Field>
                <FieldLabel htmlFor="company-name">Company Name</FieldLabel>
                <Input
                    id="company-name"
                    placeholder="Enter company name"
                    required
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="position-title">Position Title</FieldLabel>
                <Input
                    id="position-title"
                    placeholder="Enter position title"
                    required
                />
            </Field>
            <div className="flex flex-col gap-4 lg:flex-row md:space-x-4">
                <Field>
                    <FieldLabel htmlFor="work-mode">Work Mode</FieldLabel>
                    <Select items={workModeOptions} id="work-mode">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                            <SelectGroup>
                                {workModeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel htmlFor="app-status">Status</FieldLabel>
                    <MultiSelect
                        id="app-status"
                        options={statusOptions}
                        onValueChange={setSelectedValues}
                        defaultValue={selectedValues}
                        variant="default"
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="applied-date">Applied Date</FieldLabel>
                    <DatePickerInput />
                </Field>
            </div>
            <FieldGroup>
                <FieldLabel htmlFor="app-links">Links</FieldLabel>
                {links.map((link) => (
                    <Field orientation="horizontal">
                        <Input
                            id="app-links"
                            placeholder="Enter application links"
                            type="url"
                            value={link.url}
                            onChange={(e) => handleLinkChange(link.id, e.target.value)}
                            className="max-w-sm"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove link"
                            className="rounded-full"
                            onClick={() => handleRemoveLink(link.id)}
                        >
                            <XIcon />
                        </Button>
                    </Field>
                ))}
                <Button
                    variant="ghost"
                    onClick={() => handleAddLink()}
                    className="max-w-sm"
                >
                    <PlusIcon /> Add a link
                </Button>
            </FieldGroup>
            <FieldGroup>
                <FieldLabel htmlFor="app-files">Files</FieldLabel>
                <Field orientation="responsive">
                    <FieldLabel htmlFor="app-resume" className="max-w-[100px]">Resume</FieldLabel>
                    <Input
                        id="app-resume"
                        aria-label="Attach application resume"
                        type="file"
                        className="max-w-sm"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    />
                </Field>
                <Field orientation="responsive">
                    <FieldLabel htmlFor="app-cover-letter" className="max-w-[100px]">Cover Letter</FieldLabel>
                    <Input
                        id="app-cover-letter"
                        aria-label="Attach application cover letter"
                        type="file"
                        className="max-w-sm"
                        onChange={(e) => setCoverLetterFile(e.target.files?.[0] || null)}
                    />
                </Field>
                {files.map((file) => (
                    <Field orientation="horizontal">
                        <Input
                            id="app-files"
                            aria-label="Attach application file"
                            type="file"
                            value={file.url}
                            onChange={(e) => handleFileChange(file.id, e.target.value)}
                            className="max-w-sm"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove file"
                            className="rounded-full"
                            onClick={() => handleRemoveFile(file.id)}
                        >
                            <XIcon />
                        </Button>
                    </Field>
                ))}
                <Button
                    variant="ghost"
                    onClick={() => handleAddFile()}
                    className="max-w-sm"
                >
                    <PlusIcon /> Add a file
                </Button>
            </FieldGroup>
        </FieldGroup>
    )
}
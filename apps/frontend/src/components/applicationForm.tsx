import * as React from "react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { INTEREST_LEVEL_OPTIONS, STATUS_OPTIONS, WORK_MODE_OPTIONS, type Application } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { DatePickerInput } from "./ui/date-picker";
import { Button } from "./ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "./ui/input-group";

interface ApplicationFormProps {
    application?: Application
    formId?: string
    onSubmit?: (data: any) => void
}

export function ApplicationForm({
    application,
    formId,
    onSubmit
}: ApplicationFormProps) {
    const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([])
    const [links, setLinks] = React.useState<Record<string, string>[]>([])
    const [files, setFiles] = React.useState<Record<string, string>[]>([])
    const [postings, setPostings] = React.useState<Record<string, string>[]>([])
    const [responseRecordStyle, setResponseRecordStyle] = React.useState<string>("qa")
    const [responseQuestions, setResponseQuestions] = React.useState<Record<string, string>[]>([])
    const [formData, setFormData] = React.useState({})

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

    const handleAddPosting = () => {
        setPostings([...postings, { id: crypto.randomUUID(), url: "" }])
    }
    const handleRemovePosting = (id: string) => {
        setPostings(postings.filter((posting) => posting.id !== id))
    }
    const handlePostingChange = (id: string, url: string) => {
        setPostings(
            postings.map((posting) => (posting.id === id ? { ...posting, url } : posting))
        )
    }

    const responseRecordStyleOptions = [
        {
            label: "Q&A",
            value: "qa",
        },
        {
            label: "Free text",
            value: "free-text",
        }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({
                ...formData,
                status: selectedStatuses,
                links: links,
                files: files,
                postings: postings,
                responseQuestions: responseQuestions,
            });
        }
    }

    return (
        <form id={formId} onSubmit={handleSubmit}>
        <FieldGroup>
            <Field className="w-[50%] md:w-[25%]">
                <FieldLabel htmlFor="interest-level">Interest Level</FieldLabel>
                <Select
                    items={interestLevelOptions}
                    id="interest-level"
                    defaultValue={application?.interest?.label}
                    onValueChange={(value) => setFormData({ ...formData, interest: value })}
                >
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
                <FieldLabel htmlFor="company-name">Company Name*</FieldLabel>
                <Input
                    id="company-name"
                    placeholder="Enter company name"
                    defaultValue={application?.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="position-title">Position Title*</FieldLabel>
                <Input
                    id="position-title"
                    placeholder="Enter position title"
                    defaultValue={application?.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                />
            </Field>
            <div className="flex flex-col gap-4 lg:flex-row md:space-x-4">
                <Field>
                    <FieldLabel htmlFor="work-mode">Work Mode</FieldLabel>
                    <Select
                        items={workModeOptions}
                        id="work-mode"
                        defaultValue={application?.workMode}
                        onValueChange={(value) => setFormData({ ...formData, workMode: value })}
                    >
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
                        onValueChange={setSelectedStatuses}
                        defaultValue={application?.status.map((status) => status.label) || selectedStatuses}
                        variant="default"
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="applied-date">Applied Date</FieldLabel>
                    <DatePickerInput defaultValue={application?.applyDate} onValueChange={(value) => setFormData({ ...formData, applyDate: value })} />
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
                        // onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    />
                </Field>
                <Field orientation="responsive">
                    <FieldLabel htmlFor="app-cover-letter" className="max-w-[100px]">Cover Letter</FieldLabel>
                    <Input
                        id="app-cover-letter"
                        aria-label="Attach application cover letter"
                        type="file"
                        className="max-w-sm"
                        // onChange={(e) => setCoverLetterFile(e.target.files?.[0] || null)}
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
            <FieldGroup>
                <FieldLabel htmlFor="app-links">Posting Copy</FieldLabel>
                {postings.map((posting) => (
                    <Field orientation="horizontal">
                        <Input
                            id="app-links"
                            placeholder="Enter posting url"
                            type="url"
                            value={posting.url}
                            onChange={(e) => handlePostingChange(posting.id, e.target.value)}
                            className="max-w-sm"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove link"
                            className="rounded-full"
                            onClick={() => handleRemovePosting(posting.id)}
                        >
                            <XIcon />
                        </Button>
                    </Field>
                ))}
                <Button
                    variant="ghost"
                    onClick={() => handleAddPosting()}
                    className="max-w-sm"
                >
                    <PlusIcon /> Add a copy of the posting
                </Button>
            </FieldGroup>
            <Field>
                <div className="flex flex-col gap-2 md:flex-row md:space-x-4">
                    <FieldLabel htmlFor="response-record" className="flex-1">Response Record</FieldLabel>
                    <Select
                        items={responseRecordStyleOptions}
                        id="response-record-style"
                        value={responseRecordStyle}
                        onValueChange={(e) => setResponseRecordStyle(responseRecordStyleOptions.find((option) => option.value === e)?.value || "qa")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Choose style" />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                            <SelectGroup>
                                {responseRecordStyleOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {responseRecordStyle === "qa" ? (
                <FieldGroup>
                    {responseQuestions.map((question, index) => (
                        <FieldGroup className="flex flex-col gap-2 md:flex-row md:space-x-4" key={index}>
                            <div className="flex-grow flex flex-col gap-2">
                                <FieldLabel htmlFor={`response-record-question-${index}`} className="max-w-[100px]">
                                    Question {index + 1}
                                </FieldLabel>
                                <Field>
                                    <InputGroup className="width-full">
                                        <InputGroupInput
                                            id="response-record-question"
                                            placeholder="Enter response question"
                                            value={question.question}
                                            onChange={(e) => {
                                                const updatedQuestions = [...responseQuestions]
                                                updatedQuestions[index].question = e.target.value
                                                setResponseQuestions(updatedQuestions)
                                            }}
                                        />
                                        <InputGroupAddon align="block-start">
                                            <InputGroupText>Question</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Field>
                                    <InputGroup className="width-full">
                                        <InputGroupTextarea
                                            id="response-record-answer"
                                            placeholder="Enter response answer"
                                            value={question.answer}
                                            onChange={(e) => {
                                                const updatedQuestions = [...responseQuestions]
                                                updatedQuestions[index].answer = e.target.value
                                                setResponseQuestions(updatedQuestions)
                                            }}
                                            className="!flex-none !resize-y field-sizing-content min-h-16"
                                        />
                                        <InputGroupAddon align="block-start">
                                            <InputGroupText>Answer</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Remove question"
                                className="rounded-full self-center"
                                onClick={() => {
                                    const updatedQuestions = [...responseQuestions]
                                    updatedQuestions.splice(index, 1)
                                    setResponseQuestions(updatedQuestions)
                                }}
                            >
                                <XIcon />
                            </Button>
                        </FieldGroup>
                    ))}
                    <Button
                        variant="ghost"
                        onClick={() => setResponseQuestions([...responseQuestions, { question: "", answer: "" }])}
                    >
                        <PlusIcon /> Add a question
                    </Button>
                </FieldGroup>
                ) : (
                    <Textarea id="response-record" placeholder="Enter response record" />
                )}
            </Field>
        </FieldGroup>
        </form>
    )
}
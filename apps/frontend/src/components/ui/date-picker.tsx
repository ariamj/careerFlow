"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    placeholder?: string | undefined,
    render?: React.ReactNode | undefined
    defaultValue?: Date | undefined
    onValueChange?: (value: string) => void
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export function DatePickerInput({
    placeholder = "Select a date",
    onValueChange,
    ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))

  React.useEffect(() => {
    if (props.defaultValue) {
      setDate(props.defaultValue)
      setMonth(props.defaultValue)
      setValue(formatDate(props.defaultValue))
    }
  }, [props.defaultValue])

  return (
    <InputGroup>
        <InputGroupInput
            id="date-required"
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              const date = new Date(e.target.value)
              setValue(e.target.value)
              onValueChange?.(e.target.value)
              if (isValidDate(date)) {
                  setDate(date)
                  setMonth(date)
              }
            }}
            onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault()
                setOpen(true)
            }
            }}
        />
        <InputGroupAddon align="inline-end">
            <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={<InputGroupButton id="date-picker" variant="ghost" size="icon-xs" aria-label="Select date"><CalendarIcon /><span className="sr-only">Select date</span></InputGroupButton>} />
            <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="end"
                alignOffset={-8}
                sideOffset={10}
            >
                {props.render? props.render : (
                    <Calendar
                        mode="single"
                        selected={date}
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                            setDate(date)
                            setValue(formatDate(date))
                            onValueChange?.(formatDate(date))
                            setOpen(false)
                        }}
                    />
                )}
            </PopoverContent>
            </Popover>
        </InputGroupAddon>
    </InputGroup>
  )
}

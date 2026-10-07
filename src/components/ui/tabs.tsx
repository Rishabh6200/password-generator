"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex w-fit items-center justify-center rounded-full p-1 text-muted-foreground group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:rounded-2xl data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tabsIndicatorVariants = cva(
  "absolute z-0 pointer-events-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-background shadow-xs dark:bg-input/30 dark:border dark:border-input group-data-vertical/tabs:rounded-2xl",
        line:
          "bg-foreground group-data-horizontal/tabs:!top-auto group-data-horizontal/tabs:bottom-0 group-data-horizontal/tabs:!h-0.5 group-data-vertical/tabs:!left-auto group-data-vertical/tabs:right-0 group-data-vertical/tabs:!w-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsIndicator({
  className,
  variant = "default",
  style,
  ...props
}: TabsPrimitive.Indicator.Props & VariantProps<typeof tabsIndicatorVariants>) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      data-variant={variant}
      className={cn(tabsIndicatorVariants({ variant }), className)}
      style={{
        left: 0,
        top: 0,
        width: "var(--active-tab-width)",
        height: "var(--active-tab-height)",
        transform:
          "translate3d(var(--active-tab-left, 0px), var(--active-tab-top, 0px), 0)",
        transitionProperty: "transform, width, height",
        transitionDuration: "300ms",
        transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
        ...style,
      }}
      {...props}
    />
  )
}

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  const hasIndicator = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === TabsIndicator ||
        (child.props as { "data-slot"?: string })?.["data-slot"] === "tabs-indicator")
  )

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {!hasIndicator && <TabsIndicator variant={variant} />}
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-2 rounded-full border border-transparent! px-3 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-colors group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:rounded-2xl group-data-vertical/tabs:px-3 group-data-vertical/tabs:py-1.5 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:text-foreground dark:data-active:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-sm outline-none",
        "transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "motion-safe:data-starting-style:data-[activation-direction=left]:-translate-x-4",
        "motion-safe:data-starting-style:data-[activation-direction=right]:translate-x-4",
        "motion-safe:data-ending-style:data-[activation-direction=left]:translate-x-4",
        "motion-safe:data-ending-style:data-[activation-direction=right]:-translate-x-4",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator, tabsListVariants, tabsIndicatorVariants }


import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '~/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn('', className)}
        {...props}
        data-oid="3y8zuk2"
    />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex" data-oid="4apn7n0">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                'py-2 mt-2 capitalize heading2sub tracking-tighter flex flex-1 items-center justify-between transition-all hover:text-opacity-80 text-left [&[data-state=open]>svg]:rotate-180',
                className,
            )}
            {...props}
            data-oid=".8xjv2p"
        >
            {children}
            <ChevronDown
                className="h-6 w-6 mr-[-2px] shrink-0 transition-transform duration-200 dark:text-neutral-400"
                data-oid="jw5t4ro"
            />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
        data-oid="p8_h4ik"
    >
        <div className={cn(className)} data-oid="xamda.z">
            {children}
        </div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

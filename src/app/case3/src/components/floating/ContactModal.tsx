"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContactModal } from '@/context/contact-modal-context';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  zip: z.string().length(5, '5-digit ZIP required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
});

export const ContactModal = () => {
  const { isOpen, closeModal, prefilledData } = useContactModal();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      zip: '',
      service: '',
      message: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: '',
        phone: '',
        zip: prefilledData.zip || '',
        service: prefilledData.service || '',
        message: prefilledData.message || '',
      });
    }
  }, [isOpen, prefilledData, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form Submitted:', values);
    toast({
      title: "Request Sent!",
      description: "A technician will call you within 20 minutes.",
      variant: "default",
    });
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl uppercase tracking-tight">Get Your Free Quote</DialogTitle>
          <DialogDescription className="font-body">
            Fill this out and we'll be in touch in minutes.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-code text-[10px] uppercase font-black text-muted-foreground">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="rounded-xl h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-code text-[10px] uppercase font-black text-muted-foreground">Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 000-0000" {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-code text-[10px] uppercase font-black text-muted-foreground">ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="55401" maxLength={5} {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-code text-[10px] uppercase font-black text-muted-foreground">Service Needed</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing Repair</SelectItem>
                      <SelectItem value="heating">Heating / Furnace</SelectItem>
                      <SelectItem value="cooling">AC / Cooling</SelectItem>
                      <SelectItem value="drain">Drain Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-code text-[10px] uppercase font-black text-muted-foreground">How can we help?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe the issue..." {...field} className="rounded-xl resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-14 bg-primary text-white font-headline text-lg rounded-xl uppercase tracking-wide mt-4">
              Send Request
            </Button>
            <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-widest pt-2">
              <CheckCircle2 className="inline h-3 w-3 mr-1 text-success" />
              Your data is secured and never shared.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

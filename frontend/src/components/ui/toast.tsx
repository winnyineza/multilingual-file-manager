import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  variant?: 'default' | 'destructive';
}

export interface ToastActionElement {
  altText?: string;
  action: () => void;
}

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 right-0 p-4 flex flex-col gap-2 w-[390px] max-w-[100vw] z-50',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
    variant?: 'default' | 'destructive';
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(
      'bg-white rounded-md shadow-lg p-4',
      variant === 'destructive' && 'bg-red-600 text-white',
      className
    )}
    {...props}
  />
));
Toast.displayName = ToastPrimitives.Root.displayName;

export { ToastProvider, ToastViewport, Toast }; 
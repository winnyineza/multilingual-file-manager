import * as React from "react";
import { Toast, ToastActionElement, ToastProps } from "./toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

type ActionType = typeof actionTypes;

// ... (reducer implementation)

export function useToast() {
  const [state, dispatch] = React.useReducer(toastReducer, {
    toasts: [],
  });

  return {
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: { ...props, id },
      });
    },
    dismiss: (toastId?: string) => {
      dispatch({
        type: actionTypes.DISMISS_TOAST,
        toastId,
      });
    },
  };
}

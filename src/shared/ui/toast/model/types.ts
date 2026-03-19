export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type ToastState = {
  visible: boolean;
  message: string | null;
  variant: ToastVariant;
};

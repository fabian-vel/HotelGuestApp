export interface AlertState {
    visible: boolean;
    title?: string;
    message?: string;
    alertType?: 'success' | 'error' | 'warning' | 'info';
    acceptText?: string;
    cancelText?: string;
    onAccept?: () => void;
    onCancel?: () => void;
}

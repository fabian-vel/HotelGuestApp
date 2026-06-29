export interface AlertState {
    visible: boolean;
    title?: string;
    message?: string;
    alertType?: 'success' | 'error' | 'warning' | 'question';
    acceptText?: string;
    cancelText?: string;
    onAccept?: () => void;
    onCancel?: () => void;
}

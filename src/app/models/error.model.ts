export interface HttpErrorHandler {
    type?: 'on-client' | 'on-server';
    errorMessage?: string;
}
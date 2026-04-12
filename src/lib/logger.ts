const timestamp = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
}

export const logger = {
    info: (message: string) => {
        console.log(`${timestamp()} - INFO: ${message}`);
    },
    error: (message: string, error?: unknown) => {
        console.error(`${timestamp()} - ERROR: ${message}`, error ?? 'No error provided');
    }
}
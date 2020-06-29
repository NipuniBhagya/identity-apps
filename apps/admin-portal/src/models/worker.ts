export class WebWorker extends Worker {
    public postMessage: (this: WebWorker, message: any) => void
}

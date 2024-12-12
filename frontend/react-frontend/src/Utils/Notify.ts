import { Notyf } from "notyf";

class Notify {
    private notyf = new Notyf({
        duration: 3000,
        position: {x: "center", y: "top"},
        dismissible: true
    });


    public success(message: string): void{
        this.notyf.success(message);
    }

    public error(message: any): void{
        const extractedMessage = this.extractErrorMessage(message);
        this.notyf.error(extractedMessage);
    }

    private extractErrorMessage(err: any): string{
        // 1. sending an error string
        if (typeof err === "string" && err !== ""){
            return err;
        }
        // 2. error in a response
        if (typeof err?.response?.data === "string" && err?.response?.data !== ""){
            return err.response.data;
        }

        // 3. error in a message
        if (typeof err?.message === "string" && err?.message !== ""){
            return err?.message;
        }

        // 4. unexpected error
        return "Some error has occurred, please try again"
    }
}

export const notify = new Notify();

export class BaseService {
    protected baseUrl: string | undefined;

    
    protected returnData(code: number, message: string, data: any) {
        const content = {
            code: code,
            message: message,
            data: data
        }

        return content;
    }
}
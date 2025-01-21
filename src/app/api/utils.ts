import { ZodObject, ZodRawShape } from "zod";

export function getparsedBody<T extends ZodRawShape>(ZodSchema: ZodObject<T>, body: unknown) {
    const parsedBody = ZodSchema.safeParse(body);
    if (!parsedBody.success) {
        let details = "";
        if (parsedBody.error.errors) {
            details = parsedBody.error.errors.map((error) => error.message + " " + error.path + " " + error.code).join(", ");
        }

        return {success: true, content: details};
    }
    return {sucess: false, content: parsedBody};
}
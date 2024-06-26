import { z } from "zod"

export const LoginSchema = z.object(
    {
        email:z.string().email(),
        password:z.string().min(4)
    }
)

export type TLogin = z.infer<typeof LoginSchema>
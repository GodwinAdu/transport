import { cookies } from "next/headers";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken"
import { fetchAdmin } from "../actions/admin.actions";


interface RequestCookie {
    id: string;
    username: string;
    iat: Date
    exp: Date
}


export async function currentProfile() {
    const cookiesStore = cookies();

    const tokenValue = cookiesStore.get("token");

    try {
        if (!tokenValue || !tokenValue.value) {
            return null;
        }

        const decode: JwtPayload | string = await jwt.verify(tokenValue.value, process.env.TOKEN_SECRET!);

        // Check if the token has expired
        if (typeof decode === 'string') {
            return null;
        }

        const user = await fetchAdmin({ id: decode.id });

        if (!user) {
            return null;
        }

        return user;

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return null;
        }

        console.error("Error decoding token", error);
        return null;
    }
}

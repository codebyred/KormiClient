import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Credentials = {
    user: {
        firstName:string,
        lastName:string,
        email:string
    } | null,
    accessToken: string | null
}

const initialState: Credentials = {
    user: null,
    accessToken: null,
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredentials:(state, action: PayloadAction<Credentials>)=>{
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state, action: PayloadAction<Credentials>)=>{
            state.user = null;
            state.accessToken = null
        }

    }

});

export const { setCredentials, logout } = auth.actions;
export default auth.reducer;
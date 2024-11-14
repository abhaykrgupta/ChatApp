import { create } from "zustand";
import { createAuthSlice } from "./slice/auth-slice";

export const useAppStore = create()((...a)=>({
    ...createAuthSlice(...a),
}))

/*
create() is called to initialize the Zustand store.
(...a) => ({ ... }) is a function that takes any arguments passed by Zustand (in this case, set and get functions for updating and accessing the store) and spreads them into createAuthSlice.
...createAuthSlice(...a):

This uses the createAuthSlice function, passing it set and get from Zustand (received through ...a).
The createAuthSlice(...a) function returns an object that might look like this:
javascript
Copy code

*/
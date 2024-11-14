

export const createAuthSlice = (set) => ({
    userInfo: undefined,  // Initialize with profileSetup as false
    setUserInfo: (userInfo) => set({ userInfo }),  // Update userInfo
 
        //setuserinfo is a function to update the userinfo state it take userinfo as a parameter and uses set to update the store with the new value
    });
  
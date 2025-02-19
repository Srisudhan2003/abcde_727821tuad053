import {createSlice} from '@reduxjs/toolkit'


export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        value: 
            {name:''}
           
    },
    
    reducers:{  
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = '';
        }
    }
})
export const {login,logout} = UserSlice.actions;
export default UserSlice.reducer; 
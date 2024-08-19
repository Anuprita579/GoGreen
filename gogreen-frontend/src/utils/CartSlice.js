import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        additem: (state, action) =>{
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem){
                existingItem.quantity += 1; 
            }
            else{
                state.items.push({...action.payload, quantity:1});
            }
        },
        removeItem: (state, action)=>{
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart: (state, action)=>{
            state.items = [];
        },
        decrementItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if(itemIndex !== -1){
                const item = state.items[itemIndex]
                if (item && item.quantity > 1){
                    item.quantity -= 1;
                }
                else{
                    state.items.splice(itemIndex, 1);
                }
            }
        }
    }
});
export const {additem, removeItem, clearCart, decrementItem} = cartSlice.actions
export default cartSlice.reducer;
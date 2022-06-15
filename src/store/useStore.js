import create from "zustand";
import createGameSlice from '../store/slices/createGameSlice'

const useStore = create((set,get)=>({
    ...createGameSlice(set,get),
}))

export default useStore;
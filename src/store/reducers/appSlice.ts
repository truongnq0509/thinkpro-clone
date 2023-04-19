import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ICategory, IBrand } from "~/interfaces";
import { IQuery } from "~/interfaces/query";
import { getCategories as apiGetCategories, getCategory as apiGetCategory } from "~/services/categoryService";

export const getCategories = createAsyncThunk("category/getAll", async (_, thunkApi) => {
	const response = await apiGetCategories();
	return response?.data;
});

export const getCategory = createAsyncThunk("category/getSingle", async (query: IQuery, thunkApi) => {
	const response = await apiGetCategory(query);
	return response?.data;
});

type initialStateType = {
	categories: ICategory[];
	products: IProduct[];
	isLoading: boolean;
};

const initialState: initialStateType = {
	categories: [],
	products: [],
	isLoading: false,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCategories.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
			state.isLoading = false;
			state.categories = action.payload;
		});
		builder.addCase(getCategories.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(getCategory.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCategory.fulfilled, (state, action) => {
			const { products } = action.payload;
			state.isLoading = false;
			state.products = products;
		});
		builder.addCase(getCategory.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default appSlice.reducer;
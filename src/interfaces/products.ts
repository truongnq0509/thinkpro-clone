export interface IProduct {
	_id?: string;
	name?: string;
	price?: number | string;
	discount?: number;
	slug?: string;
	thumbnail?: {
		path: string;
		filename: string;
	};
	description?: string;
	attributes?: any;
	assets?: [];
	status?: number;
	categoryId?: any;
	category?: any;
	brandId?: string;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
	deleted?: boolean;
	_v?: string;
	loading?: boolean;
	stock?: any;
}

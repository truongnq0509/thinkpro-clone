export interface IBrand {
	_id?: string;
	name?: string;
	slug?: string;
	image?: {
		path: string;
		filename: string;
	};
	parentId?: string;
	categoryIds?: [];
	children?: IBrand[];
	description?: string;
	createdAt?: string;
	updatedAt?: string;
	_v?: string;
}

export type ProductType = {
	name: string;
	id: number;
	price: number;
	category: string;
	description: string;
	image: string;
};


export type CartProductType = {
	name: string;
	image: string;
	price: number;
	id: number;
	onClick?: () => void;
};


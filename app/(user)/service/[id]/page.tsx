'use client'
import CardComponent from '@/components/card/CardProductDetail'
import { useGetProductByIdQuery } from '@/redux/service/ecommerce'

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};


// export async function generateMetadata(
// 	{ params, searchParams }: Props,
// 	parent: ResolvingMetadata
// ): Promise<Metadata> {
// 	// read route params
// 	const id = params.id;
//
// 	// fetch data
// 	// const product = await fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json());
//
// 	// optionally access and extend (rather than replace) parent metadata
// 	// const previousImages = (await parent).openGraph?.images || [];
//
// 	return {
// 		title: product.title,
// 		description: product.description,
// 		openGraph: {
// 			images: product.image,
// 		},
// 	};
// }
//


export default function Detail(props: Props) {
	const {data, error, isLoading} = useGetProductByIdQuery(parseInt(props.params.id));
	return (
		<div className="h-screen grid place-content-center">
			<CardComponent
				title={data?.title || "NoTitle"}
				description={data?.description || "No Description"}
				image={
					data?.image ||
					"https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
				}
			/>
		</div>
	);
}

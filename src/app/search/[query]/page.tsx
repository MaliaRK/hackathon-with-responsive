import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SearchResultsPage = async ({ params }: { params: { query: string } }) => {
    const { query } = params;

    // Fetch results from the API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!res.ok) {
        return <div>Error: {data.message}</div>;
    }

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            {data.length > 0 ? (
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {data.map((product: any) => (
                       <Link href={`/products/${product.slug}`} key={product.slug}>
                        <li>
                            <div>
                                <img
                                    src={urlFor(product.image).url()}
                                    alt={product.productName}
                                    width={348}
                                    height={10}
                                />
                                <div>
                                    <span className="text-[#9E3500]">{product.status}</span>
                                    <h3>
                                        <strong>{product.productName}</strong>
                                    </h3>
                                    <p className="text-xs">
                                        {product.category} <br />
                                        {product.inventory} {product.colors?.join(', ')}
                                    </p>
                                    <h4>
                                        <strong>MRP : &#8377;{product.price}</strong>
                                    </h4>
                                </div>
                            </div>
                        </li></Link>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;

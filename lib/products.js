function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
  };
}

export async function getProducts() {
  const response = await fetch('http://localhost:1337/products');
  const products = await response.json();
  return products.map(stripProduct);
}

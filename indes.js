const select = query => document.querySelector(query);
const addEvent = (element, event, handler) => element.addEventListener(event, handler);

const btnCart = select('.container-cart-icon');
const containerCartProducts = select('.container-cart-products');
const cartInfo = select('.cart-product');
const rowProduct = select('.row-product');
const productsList = select('.container-items');
const valorTotal = select('.total-pagar');
const countProducts = select('#contador-productos');
const cartEmpty = select('.cart-empty');
const cartTotal = select('.cart-total');

let allProducts = [];

addEvent(btnCart, 'click', () => containerCartProducts.classList.toggle('hidden-cart'));

addEvent(productsList, 'click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;
		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exists = allProducts.some(product => product.title === infoProduct.title);

		if (exists) {
			allProducts = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
				}
				return product;
			});
		} else {
			allProducts.push(infoProduct);
		}

		showHTML();
	}
});

addEvent(rowProduct, 'click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(product => product.title !== title);

		showHTML();
	}
});

// Funcion para mostrar HTML
const showHTML = () => {
	const isEmpty = !allProducts.length;
	cartEmpty.classList.toggle('hidden', !isEmpty);
	rowProduct.classList.toggle('hidden', isEmpty);
	cartTotal.classList.toggle('hidden', isEmpty);

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total += product.quantity * parseFloat(product.price.slice(1));
		totalOfProducts += product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};

const pendingProducts = [];
const deliveredProducts = [];
let totalIncome = 0;

function addProduct() {
    const productName = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const paymentType = document.getElementById('paymentType').value;
    const price = parseFloat(document.getElementById('price').value);

    // Calcula el precio total
    const totalPrice = quantity * price;

    const product = {
        name: productName,
        quantity: quantity,
        paymentType: paymentType,
        price: price,
        totalPrice: totalPrice  // Guarda el precio total del producto
    };

    if (paymentType === 'contado' || paymentType === 'transferencia') {
        totalIncome += totalPrice;  // Usa totalPrice para actualizar totalIncome
    }

    pendingProducts.push(product);
    updateProducts();
}

function updateProducts() {
    const pendingContainer = document.getElementById('pendingProducts');
    const deliveredContainer = document.getElementById('deliveredProducts');

    pendingContainer.innerHTML = '';
    deliveredContainer.innerHTML = '';

    pendingProducts.forEach((product, index) => {
        const productDiv = createProductDiv(product);

        const deliverButton = document.createElement('button');
        deliverButton.textContent = 'Entregado';
        deliverButton.addEventListener('click', () => {
            deliveredProducts.push(product);
            pendingProducts.splice(index, 1);
            updateProducts();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            pendingProducts.splice(index, 1);
            updateProducts();
        });

        productDiv.appendChild(deliverButton);
        productDiv.appendChild(deleteButton);

        pendingContainer.appendChild(productDiv);
    });

    deliveredProducts.forEach(product => {
        const productDiv = createProductDiv(product);
        productDiv.classList.add('delivered'); // Agregar clase 'delivered' para los productos entregados
        deliveredContainer.appendChild(productDiv);
    });

    // Recalcular el total de ingresos cuando se actualizan los productos
    totalIncome = deliveredProducts.reduce((total, product) => total + product.totalPrice, 0);

    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
}

function createProductDiv(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.textContent = `${product.name} (${product.quantity} unidades) - Precio Unitario: $${product.price}, Precio Total: $${product.totalPrice}`;

    // Aplicar clase 'transferencia' si el pago fue mediante transferencia
    if (product.paymentType === 'transferencia') {
        productDiv.classList.add('transferencia');
    }

    // Aplicar clase 'contado' si el pago fue en efectivo
    if (product.paymentType === 'contado') {
        productDiv.classList.add('contado');
    }

    return productDiv;
}

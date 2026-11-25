/* =========================================
   CORAZÓN DE MELÓN
   Desarrollo web - Lucila Studio
========================================= */

/* =========================================
   CONFIGURACIÓN GENERAL
========================================= */

const WHATSAPP = '5493415053490'

const STORAGE_KEY = 'corazonDeMelonCarrito'

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
})

function money (valor) {
  return formatoPrecio.format(valor)
}

/* =========================================
   CATÁLOGO DE PRODUCTOS
   Datos de demostración
========================================= */

const productos = [
  /* BEBÉS */

  {
    id: 1,
    nombre: 'Body Dulzura',
    categoria: 'Bebés',
    precio: 12900,
    descripcion: 'Body de algodón suave, ideal para todos los días.',
    imagen: 'assets/productos/body.jpg',
    talles: ['0-3 meses', '3-6 meses', '6-9 meses', '9-12 meses'],
    colores: ['Crudo', 'Blanco', 'Rosa'],
    stock: 15,
    destacado: 'Nuevo'
  },

  {
    id: 2,
    nombre: 'Body Pequeño Amor',
    categoria: 'Bebés',
    precio: 14900,
    descripcion: 'Una prenda delicada y cómoda para los primeros momentos.',
    imagen: 'assets/productos/body2.jpg',
    talles: ['0-3 meses', '3-6 meses', '6-9 meses'],
    colores: ['Beige', 'Blanco', 'Celeste'],
    stock: 12,
    destacado: ''
  },

  {
    id: 3,
    nombre: 'Enterito Nube',
    categoria: 'Bebés',
    precio: 24900,
    descripcion: 'Enterito de textura suave y diseño delicado.',
    imagen: 'assets/productos/enterito.jpg',
    talles: ['0-3 meses', '3-6 meses', '6-9 meses', '9-12 meses'],
    colores: ['Crudo', 'Beige', 'Rosa'],
    stock: 10,
    destacado: 'Nuevo'
  },

  {
    id: 4,
    nombre: 'Conjunto Primeros Pasos',
    categoria: 'Bebés',
    precio: 28900,
    descripcion: 'Conjunto de dos piezas pensado para brindar comodidad.',
    imagen: 'assets/productos/conjunto-bebe.jpg',
    talles: ['6-9 meses', '9-12 meses', '12-18 meses'],
    colores: ['Beige', 'Crudo', 'Verde agua'],
    stock: 8,
    destacado: ''
  },

  /* NENAS */

  {
    id: 5,
    nombre: 'Vestido Amelia',
    categoria: 'Nenas',
    precio: 34900,
    descripcion: 'Vestido delicado para ocasiones especiales.',
    imagen: 'assets/productos/vestido.jpg',
    talles: ['2', '4', '6', '8', '10', '12'],
    colores: ['Crudo', 'Rosa'],
    stock: 10,
    destacado: 'Nuevo'
  },

  {
    id: 6,
    nombre: 'Vestido Olivia',
    categoria: 'Nenas',
    precio: 32900,
    descripcion: 'Un diseño romántico, fresco y cómodo.',
    imagen: 'assets/productos/vestido2.jpg',
    talles: ['2', '4', '6', '8', '10'],
    colores: ['Blanco', 'Rosa', 'Beige'],
    stock: 9,
    destacado: ''
  },

  {
    id: 7,
    nombre: 'Blusa Emma',
    categoria: 'Nenas',
    precio: 21900,
    descripcion: 'Blusa liviana con detalles delicados.',
    imagen: 'assets/productos/blusa.jpg',
    talles: ['4', '6', '8', '10', '12'],
    colores: ['Blanco', 'Crudo', 'Rosa'],
    stock: 12,
    destacado: ''
  },

  {
    id: 8,
    nombre: 'Conjunto Valentina',
    categoria: 'Nenas',
    precio: 38900,
    descripcion: 'Un conjunto especial para acompañar cada aventura.',
    imagen: 'assets/productos/conjunto-nena.jpg',
    talles: ['2', '4', '6', '8', '10', '12'],
    colores: ['Rosa', 'Beige', 'Crudo'],
    stock: 8,
    destacado: 'Nueva colección'
  },

  /* NENES */

  {
    id: 9,
    nombre: 'Chomba Mateo',
    categoria: 'Nenes',
    precio: 22900,
    descripcion: 'Chomba clásica de algodón, cómoda y versátil.',
    imagen: 'assets/productos/chomba.jpg',
    talles: ['2', '4', '6', '8', '10', '12'],
    colores: ['Blanco', 'Azul', 'Beige'],
    stock: 15,
    destacado: ''
  },

  {
    id: 10,
    nombre: 'Chomba Benjamín',
    categoria: 'Nenes',
    precio: 24900,
    descripcion: 'Diseño atemporal para pequeños grandes estilos.',
    imagen: 'assets/productos/chomba2.jpg',
    talles: ['4', '6', '8', '10', '12'],
    colores: ['Celeste', 'Crudo', 'Verde'],
    stock: 12,
    destacado: 'Nuevo'
  },

  {
    id: 11,
    nombre: 'Bermuda Valentino',
    categoria: 'Nenes',
    precio: 25900,
    descripcion: 'Bermuda fresca y cómoda para todos los días.',
    imagen: 'assets/productos/bermuda.jpg',
    talles: ['2', '4', '6', '8', '10', '12'],
    colores: ['Beige', 'Azul', 'Verde oliva'],
    stock: 10,
    destacado: ''
  },

  {
    id: 12,
    nombre: 'Camisa Joaquín',
    categoria: 'Nenes',
    precio: 29900,
    descripcion: 'Camisa de estilo elegante para momentos especiales.',
    imagen: 'assets/productos/camisa.jpg',
    talles: ['4', '6', '8', '10', '12'],
    colores: ['Blanco', 'Celeste', 'Crudo'],
    stock: 9,
    destacado: 'Nueva colección'
  }
]

/* =========================================
   ELEMENTOS DEL HTML
========================================= */

const productsContainer = document.getElementById('products')

const categoryButtons = document.querySelectorAll('[data-cat]')

const categoryCards = document.querySelectorAll('[data-category]')

const sizeFilter = document.getElementById('sizeFilter')

/* Ventana de producto */

const productModal = document.getElementById('productModal')

const closeProduct = document.getElementById('closeProduct')

const modalProductImage = document.getElementById('modalProductImage')

const modalProductCategory = document.getElementById('modalProductCategory')

const modalProductName = document.getElementById('modalProductName')

const modalProductDescription = document.getElementById(
  'modalProductDescription'
)

const modalProductPrice = document.getElementById('modalProductPrice')

const modalSize = document.getElementById('modalSize')

const modalColor = document.getElementById('modalColor')

const modalQuantity = document.getElementById('modalQuantity')

const decreaseQuantity = document.getElementById('decreaseQuantity')

const increaseQuantity = document.getElementById('increaseQuantity')

const addToCart = document.getElementById('addToCart')

const productMessage = document.getElementById('productMessage')

/* Carrito */

const cartModal = document.getElementById('cart')

const openCart = document.getElementById('openCart')

const closeCart = document.getElementById('closeCart')

const cartCount = document.getElementById('count')

const cartItems = document.getElementById('items')

const cartTotal = document.getElementById('total')

const orderButton = document.getElementById('order')

const toast = document.getElementById('toast')

/* =========================================
   ESTADO DE LA TIENDA
========================================= */

let categoriaActual = 'Todos'

let talleActual = ''

let productoSeleccionado = null

let cantidadSeleccionada = 1

let toastTimer

let carrito = cargarCarrito()

/* =========================================
   IMAGEN PROVISIONAL
   TEXTO MÁS GRANDE Y LEGIBLE
========================================= */

function imagenProvisional (img) {
  img.onerror = null

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="900"
         height="1200"
         viewBox="0 0 900 1200">

      <rect width="100%"
            height="100%"
            fill="#FAF5EE"/>

      <text x="50%"
            y="39%"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="170"
            fill="#B49560">♡</text>

      <text x="50%"
            y="50%"
            text-anchor="middle"
            font-size="100"
            font-weight="bold"
            font-family="Georgia, serif"
            fill="#52382C">Corazón</text>

      <text x="50%"
            y="59%"
            text-anchor="middle"
            font-size="100"
            font-weight="bold"
            font-family="Georgia, serif"
            fill="#52382C">de Melón</text>

      <text x="50%"
            y="69%"
            text-anchor="middle"
            font-size="78"
            font-weight="600"
            font-family="Arial, sans-serif"
            fill="#66564C">Imagen</text>

      <text x="50%"
            y="76%"
            text-anchor="middle"
            font-size="78"
            font-weight="600"
            font-family="Arial, sans-serif"
            fill="#66564C">próximamente</text>

    </svg>
  `

  img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
}

function configurarImagenes (contenedor) {
  contenedor.querySelectorAll('img').forEach(img => {
    img.onerror = () => imagenProvisional(img)

    if (img.complete && img.naturalWidth === 0) {
      imagenProvisional(img)
    }
  })
}

/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function renderProductos () {
  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria =
      categoriaActual === 'Todos' || producto.categoria === categoriaActual

    const coincideTalle =
      talleActual === '' || producto.talles.includes(talleActual)

    return coincideCategoria && coincideTalle
  })

  productsContainer.innerHTML = ''

  if (productosFiltrados.length === 0) {
    productsContainer.innerHTML = `
      <div class="empty-products">

        <h3>No encontramos prendas</h3>

        <p>
          Probá seleccionando otra categoría o talle.
        </p>

      </div>
    `

    return
  }

  productosFiltrados.forEach(producto => {
    const card = document.createElement('article')

    card.className = 'product-card'

    card.dataset.id = producto.id

    card.innerHTML = `

      <div class="product-image">

        ${
          producto.destacado
            ? `
              <span class="product-badge">
                ${producto.destacado}
              </span>
            `
            : ''
        }

        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          loading="lazy">

      </div>

      <div class="product-info">

        <h3>${producto.nombre}</h3>

        <p class="product-description">
          ${producto.descripcion}
        </p>

        <strong class="product-price">
          ${money(producto.precio)}
        </strong>

        <button
          type="button"
          class="view-product"
          aria-label="Ver ${producto.nombre}">

          Ver prenda →

        </button>

      </div>

    `

    card.addEventListener('click', () => {
      abrirProducto(producto.id)
    })

    productsContainer.appendChild(card)
  })

  configurarImagenes(productsContainer)
}

/* =========================================
   FILTROS POR CATEGORÍA
========================================= */

function seleccionarCategoria (categoria) {
  categoriaActual = categoria

  talleActual = ''

  categoryButtons.forEach(button => {
    const activo = button.dataset.cat === categoria

    button.classList.toggle('active', activo)

    button.setAttribute('aria-pressed', activo)
  })

  actualizarFiltroTalles()

  renderProductos()
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    seleccionarCategoria(button.dataset.cat)
  })
})

/* Categorías con fotografías */

categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    seleccionarCategoria(card.dataset.category)

    document.getElementById('catalogo').scrollIntoView({
      behavior: 'smooth'
    })
  })
})

/* =========================================
   FILTROS POR TALLE
========================================= */

function actualizarFiltroTalles () {
  const lista =
    categoriaActual === 'Todos'
      ? productos
      : productos.filter(producto => producto.categoria === categoriaActual)

  const talles = [...new Set(lista.flatMap(producto => producto.talles))]

  sizeFilter.innerHTML = `
    <option value="">
      Todos los talles
    </option>
  `

  talles.forEach(talle => {
    const option = document.createElement('option')

    option.value = talle

    option.textContent = talle

    sizeFilter.appendChild(option)
  })

  sizeFilter.value = talleActual
}

sizeFilter.addEventListener('change', () => {
  talleActual = sizeFilter.value

  renderProductos()
})

/* =========================================
   ABRIR DETALLE DEL PRODUCTO
========================================= */

function abrirProducto (id) {
  const producto = productos.find(p => p.id === id)

  if (!producto) return

  productoSeleccionado = producto

  cantidadSeleccionada = 1

  modalProductImage.onerror = () => {
    imagenProvisional(modalProductImage)
  }

  modalProductImage.src = producto.imagen

  modalProductImage.alt = producto.nombre

  modalProductCategory.textContent = producto.categoria

  modalProductName.textContent = producto.nombre

  modalProductDescription.textContent = producto.descripcion

  modalProductPrice.textContent = money(producto.precio)

  /* Cargar talles */

  modalSize.innerHTML = `
    <option value="">
      Elegir talle
    </option>
  `

  producto.talles.forEach(talle => {
    const option = document.createElement('option')

    option.value = talle

    option.textContent = talle

    modalSize.appendChild(option)
  })

  /* Cargar colores */

  modalColor.innerHTML = `
    <option value="">
      Elegir color
    </option>
  `

  producto.colores.forEach(color => {
    const option = document.createElement('option')

    option.value = color

    option.textContent = color

    modalColor.appendChild(option)
  })

  modalQuantity.value = cantidadSeleccionada

  productMessage.textContent = ''

  productMessage.classList.remove('error')

  addToCart.disabled = producto.stock === 0

  actualizarControlCantidad()

  if (!productModal.open) {
    productModal.showModal()
  }

  productModal.scrollTop = 0
}

/* =========================================
   CERRAR DETALLE DEL PRODUCTO
========================================= */

closeProduct.addEventListener('click', () => {
  productModal.close()
})

productModal.addEventListener('click', event => {
  if (event.target === productModal) {
    const rect = productModal.getBoundingClientRect()

    const fuera =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom

    if (fuera) productModal.close()
  }
})

/* =========================================
   CONTROL DE CANTIDADES
========================================= */

function actualizarControlCantidad () {
  if (!productoSeleccionado) return

  modalQuantity.value = cantidadSeleccionada

  decreaseQuantity.disabled = cantidadSeleccionada <= 1

  increaseQuantity.disabled = cantidadSeleccionada >= productoSeleccionado.stock
}

decreaseQuantity.addEventListener('click', () => {
  if (cantidadSeleccionada > 1) {
    cantidadSeleccionada--

    actualizarControlCantidad()
  }
})

increaseQuantity.addEventListener('click', () => {
  if (!productoSeleccionado) return

  if (cantidadSeleccionada < productoSeleccionado.stock) {
    cantidadSeleccionada++

    actualizarControlCantidad()
  }
})

modalSize.addEventListener('change', limpiarMensaje)

modalColor.addEventListener('change', limpiarMensaje)

function limpiarMensaje () {
  productMessage.textContent = ''

  productMessage.classList.remove('error')
}

/* =========================================
   AGREGAR PRODUCTO AL CARRITO
========================================= */

addToCart.addEventListener('click', () => {
  if (!productoSeleccionado) return

  const talle = modalSize.value

  const color = modalColor.value

  /* Validar talle */

  if (!talle) {
    mostrarError('Seleccioná un talle para continuar.')

    modalSize.focus()

    return
  }

  /* Validar color */

  if (!color) {
    mostrarError('Seleccioná un color para continuar.')

    modalColor.focus()

    return
  }

  /* Verificar stock total del producto */

  const cantidadEnCarrito = carrito
    .filter(item => item.id === productoSeleccionado.id)
    .reduce((total, item) => total + item.cantidad, 0)

  if (cantidadEnCarrito + cantidadSeleccionada > productoSeleccionado.stock) {
    mostrarError('No hay suficiente stock disponible.')

    return
  }

  /* Identificar cada variante */

  const clave = [productoSeleccionado.id, talle, color].join('|')

  const existente = carrito.find(item => item.clave === clave)

  if (existente) {
    existente.cantidad += cantidadSeleccionada
  } else {
    carrito.push({
      clave: clave,

      id: productoSeleccionado.id,

      nombre: productoSeleccionado.nombre,

      precio: productoSeleccionado.precio,

      imagen: productoSeleccionado.imagen,

      talle: talle,

      color: color,

      cantidad: cantidadSeleccionada
    })
  }

  guardarCarrito()

  renderCarrito()

  /* Cerrar el detalle sin abrir el carrito */

  productModal.close()

  mostrarToast('♡ Producto agregado a tu bolsa')
})

function mostrarError (mensaje) {
  productMessage.textContent = mensaje

  productMessage.classList.add('error')
}

/* =========================================
   GUARDAR CARRITO
========================================= */

function guardarCarrito () {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito))
  } catch (error) {
    console.warn('No se pudo guardar el carrito.', error)
  }
}

function cargarCarrito () {
  try {
    const datos = localStorage.getItem(STORAGE_KEY)

    const guardado = datos ? JSON.parse(datos) : []

    if (!Array.isArray(guardado)) return []

    const resultado = []

    guardado.forEach(item => {
      const producto = productos.find(p => p.id === item.id)

      if (!producto) return

      if (!producto.talles.includes(item.talle)) return

      if (!producto.colores.includes(item.color)) return

      if (!Number.isInteger(item.cantidad)) return

      if (item.cantidad < 1) return

      const cantidadGuardada = resultado
        .filter(i => i.id === producto.id)
        .reduce((total, i) => total + i.cantidad, 0)

      const cantidad = Math.min(
        item.cantidad,
        producto.stock - cantidadGuardada
      )

      if (cantidad <= 0) return

      const clave = [producto.id, item.talle, item.color].join('|')

      const existente = resultado.find(i => i.clave === clave)

      if (existente) {
        existente.cantidad += cantidad
      } else {
        resultado.push({
          clave: clave,

          id: producto.id,

          nombre: producto.nombre,

          precio: producto.precio,

          imagen: producto.imagen,

          talle: item.talle,

          color: item.color,

          cantidad: cantidad
        })
      }
    })

    return resultado
  } catch (error) {
    return []
  }
}

/* =========================================
   MOSTRAR CARRITO
========================================= */

function renderCarrito () {
  cartItems.innerHTML = ''

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  const precioTotal = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  )

  cartCount.textContent = cantidadTotal

  cartTotal.textContent = `Total: ${money(precioTotal)}`

  orderButton.disabled = carrito.length === 0

  /* Carrito vacío */

  if (carrito.length === 0) {
    cartItems.innerHTML = `

      <div class="empty-cart">

        <span style="font-size:45px;color:#B49560">
          ♡
        </span>

        <h3>Tu bolsa está vacía</h3>

        <p>
          Descubrí nuestras colecciones
          y agregá tus prendas favoritas.
        </p>

        <button
          type="button"
          class="btn"
          id="seguirComprando"
          style="margin-top:20px">

          Seguir comprando

        </button>

      </div>

    `

    document.getElementById('seguirComprando').addEventListener('click', () => {
      cartModal.close()

      document.getElementById('catalogo').scrollIntoView({
        behavior: 'smooth'
      })
    })

    return
  }

  /* Productos agregados */

  carrito.forEach((item, index) => {
    const elemento = document.createElement('div')

    elemento.className = 'cart-item'

    elemento.innerHTML = `

      <img
        src="${item.imagen}"
        alt="${item.nombre}">

      <div class="cart-item-info">

        <h3>${item.nombre}</h3>

        <p>Talle: ${item.talle}</p>

        <p>Color: ${item.color}</p>

        <strong>
          ${money(item.precio * item.cantidad)}
        </strong>

        <div style="
          display:flex;
          align-items:center;
          gap:8px;
          margin-top:10px;
        ">

          <button
            type="button"
            data-action="restar"
            data-index="${index}"
            aria-label="Disminuir cantidad"
            ${item.cantidad <= 1 ? 'disabled' : ''}>

            −

          </button>

          <span>${item.cantidad}</span>

          <button
            type="button"
            data-action="sumar"
            data-index="${index}"
            aria-label="Aumentar cantidad">

            +

          </button>

        </div>

      </div>

      <button
        type="button"
        class="remove-item"
        data-action="eliminar"
        data-index="${index}"
        aria-label="Eliminar ${item.nombre}"
        title="Eliminar producto">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round">

          <path d="M3 6h18"/>

          <path d="M19 6v14H5V6"/>

          <path d="M9 6V3h6v3"/>

          <path d="M10 10v6"/>

          <path d="M14 10v6"/>

        </svg>

      </button>

    `

    cartItems.appendChild(elemento)
  })

  configurarImagenes(cartItems)
}

/* =========================================
   MODIFICAR PRODUCTOS DEL CARRITO
========================================= */

cartItems.addEventListener('click', event => {
  const button = event.target.closest('[data-action]')

  if (!button) return

  const index = Number(button.dataset.index)

  const accion = button.dataset.action

  const item = carrito[index]

  if (!item) return

  const producto = productos.find(p => p.id === item.id)

  if (!producto) return

  /* Aumentar cantidad */

  if (accion === 'sumar') {
    const cantidadTotalProducto = carrito
      .filter(i => i.id === item.id)
      .reduce((total, i) => total + i.cantidad, 0)

    if (cantidadTotalProducto >= producto.stock) {
      alert('Alcanzaste el stock disponible de esta prenda.')

      return
    }

    item.cantidad++
  }

  /* Disminuir cantidad */

  if (accion === 'restar') {
    if (item.cantidad > 1) {
      item.cantidad--
    }
  }

  /* Eliminar producto */

  if (accion === 'eliminar') {
    carrito.splice(index, 1)
  }

  guardarCarrito()

  renderCarrito()
})

/* =========================================
   ABRIR Y CERRAR CARRITO
========================================= */

openCart.addEventListener('click', () => {
  renderCarrito()

  if (!cartModal.open) {
    cartModal.showModal()
  }
})

closeCart.addEventListener('click', () => {
  cartModal.close()
})

cartModal.addEventListener('click', event => {
  if (event.target === cartModal) {
    const rect = cartModal.getBoundingClientRect()

    const fuera =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom

    if (fuera) cartModal.close()
  }
})

/* =========================================
   ENVIAR PEDIDO POR WHATSAPP
========================================= */

orderButton.addEventListener('click', () => {
  if (carrito.length === 0) return

  let mensaje = '¡Hola, Corazón de Melón! ♡\n\n'

  mensaje += 'Me gustaría consultar por el siguiente pedido:\n\n'

  carrito.forEach((item, index) => {
    mensaje += `*${index + 1}. ${item.nombre}*\n`

    mensaje += `Talle: ${item.talle}\n`

    mensaje += `Color: ${item.color}\n`

    mensaje += `Cantidad: ${item.cantidad}\n`

    mensaje += `Precio unitario: ${money(item.precio)}\n`

    mensaje += `Subtotal: ${money(item.precio * item.cantidad)}\n\n`
  })

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  )

  mensaje += `*Total del pedido: ${money(total)}*\n\n`

  mensaje += '¿Podrían confirmarme la disponibilidad '

  mensaje += 'y las formas de pago?\n\n'

  mensaje += '¡Muchas gracias!'

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`

  window.open(url, '_blank', 'noopener,noreferrer')
})

/* =========================================
   NOTIFICACIONES
========================================= */

function mostrarToast (mensaje) {
  clearTimeout(toastTimer)

  toast.textContent = mensaje

  toast.hidden = false

  toastTimer = setTimeout(() => {
    toast.hidden = true
  }, 3000)
}

/* =========================================
   INICIALIZAR TIENDA
========================================= */

function iniciarTienda () {
  actualizarFiltroTalles()

  renderProductos()

  renderCarrito()

  configurarImagenes(document)
}

iniciarTienda()

/* =========================================
   FIN DEL JAVASCRIPT
   CORAZÓN DE MELÓN
   Lucila Studio
========================================= */

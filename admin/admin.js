'use strict'

const STORAGE_KEY = 'corazonDeMelonAdminV1'
const $ = id => document.getElementById(id)
const $$ = selector => [...document.querySelectorAll(selector)]

const money = value =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(Number(value) || 0)

const uid = () =>
  globalThis.crypto?.randomUUID?.() ||
  Date.now().toString(36) + Math.random().toString(36).slice(2)

const number = value => Math.max(0, Math.floor(Number(value) || 0))

const e = value =>
  String(value ?? '').replace(
    /[&<>"']/g,
    char =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char])
  )

const escapeHTML = e

const normalize = value =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

/* IMAGEN PROVISIONAL */

const placeholderSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <rect width="900" height="1200" fill="#FAF5EE"/>
  <text x="450" y="450" text-anchor="middle" font-size="170" fill="#B49560">♡</text>
  <text x="450" y="600" text-anchor="middle" font-size="95" font-family="Georgia" fill="#52382C">Corazón</text>
  <text x="450" y="710" text-anchor="middle" font-size="95" font-family="Georgia" fill="#52382C">de Melón</text>
  <text x="450" y="840" text-anchor="middle" font-size="75" fill="#66564C">Imagen</text>
  <text x="450" y="930" text-anchor="middle" font-size="75" fill="#66564C">próximamente</text>
</svg>`

const placeholder =
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(placeholderSVG)

function imagePath (src) {
  if (!src) return placeholder
  if (src.startsWith('assets/')) return '../' + src
  if (src.startsWith('../assets/') || src.startsWith('data:image/')) return src
  return placeholder
}

function configureImages (container = document) {
  container.querySelectorAll('img').forEach(img => {
    img.onerror = () => {
      img.onerror = null
      img.src = placeholder
    }
    if (img.complete && img.naturalWidth === 0) {
      img.src = placeholder
    }
  })
}

/* CATÁLOGO DE DEMOSTRACIÓN */

function createDemoData () {
  const categories = [
    {
      id: 'bebes',
      nombre: 'Bebés',
      descripcion: 'Prendas para los primeros momentos.',
      imagen: 'assets/bebes.jpg',
      visible: true
    },
    {
      id: 'nenas',
      nombre: 'Nenas',
      descripcion: 'Moda infantil delicada y cómoda.',
      imagen: 'assets/nenas.jpg',
      visible: true
    },
    {
      id: 'nenes',
      nombre: 'Nenes',
      descripcion: 'Prendas para cada aventura.',
      imagen: 'assets/nenes.jpg',
      visible: true
    }
  ]

  const demoProducts = [
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

  const colorHex = {
    Crudo: '#E7DCCB',
    Blanco: '#FFFFFF',
    Rosa: '#D5A39B',
    Beige: '#D4BFA5',
    Celeste: '#A9CDE3',
    'Verde agua': '#A8D5BA',
    Azul: '#496C99',
    Verde: '#668B60',
    'Verde oliva': '#80864B'
  }

  const products = demoProducts.map(producto => {
    const colores = producto.colores.map(nombre => ({
      nombre,
      hex: colorHex[nombre] || '#CCCCCC'
    }))

    const variantes = producto.talles.flatMap(talle =>
      colores.map(color => ({
        talle,
        color: color.nombre,
        stock: 0
      }))
    )

    for (let i = 0; i < producto.stock; i++) {
      variantes[i % variantes.length].stock++
    }

    return {
      id: String(producto.id),
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      codigo: `CDM-${String(producto.id).padStart(3, '0')}`,
      material: '',
      precio: producto.precio,
      precioOferta: null,
      imagen: producto.imagen,
      imagenes: [producto.imagen],
      talles: [...producto.talles],
      colores,
      variantes,
      stock: producto.stock,
      stockMinimo: 3,
      destacado: producto.destacado,
      featured: false,
      visible: true,
      estado: 'published',
      creado: Date.now() - (13 - producto.id) * 86400000
    }
  })

  return {
    products,
    categories,
    promotions: [],
    announcement: {
      text: '♡ Moda infantil con mucho amor · Rosario ♡',
      visible: true
    },
    customization: {},
    settings: {}
  }
}

/* ALMACENAMIENTO LOCAL */

function loadData () {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      const parsed = JSON.parse(saved)

      if (
        Array.isArray(parsed.products) &&
        Array.isArray(parsed.categories) &&
        Array.isArray(parsed.promotions)
      ) {
        return parsed
      }
    }
  } catch (error) {
    console.warn('No se pudieron recuperar los datos.', error)
  }

  return createDemoData()
}

let db = loadData()

function saveData () {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
    return true
  } catch (error) {
    notify(
      'No se pudieron guardar los cambios',
      'El almacenamiento puede estar lleno. Reducí la cantidad de fotografías.',
      'error'
    )
    return false
  }
}

function commit (change) {
  const previous = JSON.stringify(db)
  change()

  if (!saveData()) {
    db = JSON.parse(previous)
    return false
  }

  renderAll()
  return true
}

/* NOTIFICACIONES */

let toastTimer

function notify (title, message = '', type = 'success') {
  clearTimeout(toastTimer)

  $('toastTitle').textContent = title
  $('toastMessage').textContent = message

  $('toastIcon').className =
    type === 'error'
      ? 'fa-solid fa-circle-exclamation'
      : 'fa-solid fa-circle-check'

  $('adminToast').classList.toggle('error', type === 'error')
  $('adminToast').hidden = false

  toastTimer = setTimeout(() => {
    $('adminToast').hidden = true
  }, 4500)
}

$('closeToast').addEventListener('click', () => {
  $('adminToast').hidden = true
})

/* CONFIRMACIÓN */

let pendingConfirmation = null

function confirmAction (title, message, callback) {
  $('confirmTitle').textContent = title
  $('confirmMessage').textContent = message
  pendingConfirmation = callback
  $('confirmModal').showModal()
}

$('cancelConfirm').addEventListener('click', () => {
  pendingConfirmation = null
  $('confirmModal').close()
})

$('acceptConfirm').addEventListener('click', () => {
  const callback = pendingConfirmation
  pendingConfirmation = null
  $('confirmModal').close()
  if (callback) callback()
})

$('confirmModal').addEventListener('cancel', () => {
  pendingConfirmation = null
})

/* MENÚ RESPONSIVE */

function openSidebar () {
  $('sidebar').classList.add('open', 'active')
  $('sidebarOverlay').hidden = false
  $('sidebarOverlay').classList.add('active')
  $('menuToggle').setAttribute('aria-expanded', 'true')
  document.body.classList.add('sidebar-open')
}

function closeSidebar () {
  $('sidebar').classList.remove('open', 'active')
  $('sidebarOverlay').classList.remove('active')
  $('sidebarOverlay').hidden = true
  $('menuToggle').setAttribute('aria-expanded', 'false')
  document.body.classList.remove('sidebar-open')
}

$('menuToggle').addEventListener('click', () => {
  if ($('sidebar').classList.contains('open')) {
    closeSidebar()
  } else {
    openSidebar()
  }
})

$('closeMenu').addEventListener('click', closeSidebar)
$('sidebarOverlay').addEventListener('click', closeSidebar)

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSidebar()
})

/* NAVEGACIÓN */

function showSection (sectionId) {
  const section = $(sectionId)

  if (!section || !section.classList.contains('admin-section')) return

  $$('.admin-section').forEach(item => {
    const active = item.id === sectionId
    item.hidden = !active
    item.classList.toggle('active', active)
  })

  $$('.nav-item').forEach(item => {
    const active = item.dataset.section === sectionId
    item.classList.toggle('active', active)

    if (active) {
      item.setAttribute('aria-current', 'page')
    } else {
      item.removeAttribute('aria-current')
    }
  })

  closeSidebar()
  window.scrollTo({ top: 0, behavior: 'instant' })
  $('mainContent').scrollTop = 0
  renderAll()
}

document.addEventListener('click', event => {
  const navigation = event.target.closest('[data-section], [data-go]')

  if (navigation) {
    const section = navigation.dataset.section || navigation.dataset.go

    if (section === 'agregar') resetProduct()

    showSection(section)
  }

  const close = event.target.closest('[data-close]')

  if (close) {
    $(close.dataset.close)?.close()
  }

  const brand = event.target.closest('.admin-brand')

  if (brand) {
    event.preventDefault()
    showSection('inicio')
  }
})

/* FUNCIONES GENERALES DE PRODUCTOS */

function publishedProducts () {
  return db.products.filter(p => p.estado === 'published')
}

function draftProducts () {
  return db.products.filter(p => p.estado === 'draft')
}

function productStock (product) {
  return (product.variantes || []).reduce(
    (total, variant) => total + number(variant.stock),
    0
  )
}

function isLowStock (product) {
  const stock = productStock(product)
  return stock > 0 && stock <= product.stockMinimo
}

function stockStatus (product) {
  const stock = productStock(product)

  if (stock === 0) return 'empty'
  if (isLowStock(product)) return 'low'

  return 'available'
}

function stockBadge (product) {
  const stock = productStock(product)
  const status = stockStatus(product)

  const label =
    status === 'empty'
      ? 'Agotado'
      : status === 'low'
      ? `${stock} · Stock bajo`
      : `${stock} unidades`

  return `<span class="stock-badge ${status}">${label}</span>`
}

function productImage (product) {
  return `
    <img src="${e(imagePath(product.imagen))}"
         alt="${e(product.nombre)}"
         loading="lazy">
  `
}

/* ESTADÍSTICAS DEL INICIO */

function renderDashboard () {
  const published = publishedProducts()
  const drafts = draftProducts()

  const alerts = published.filter(p => productStock(p) <= p.stockMinimo)

  $('statPublished').textContent = published.length
  $('statDrafts').textContent = drafts.length
  $('statCategories').textContent = db.categories.length
  $('statLowStock').textContent = published.filter(isLowStock).length

  $('navPublishedCount').textContent = published.length
  $('navDraftCount').textContent = drafts.length

  const recent = [...published].sort((a, b) => b.creado - a.creado).slice(0, 5)

  $('recentProducts').innerHTML = recent.length
    ? recent
        .map(
          product => `
        <div class="recent-product">
          <div class="recent-product-image">
            ${productImage(product)}
          </div>
          <div class="recent-product-info">
            <strong>${e(product.nombre)}</strong>
            <small>${e(product.categoria)}</small>
            <span>${money(product.precio)}</span>
          </div>
          <button type="button"
                  class="icon-button"
                  data-action="edit-product"
                  data-id="${e(product.id)}"
                  aria-label="Editar producto">
            <i class="fa-solid fa-pen"></i>
          </button>
        </div>
      `
        )
        .join('')
    : '<p class="field-help">Todavía no hay productos publicados.</p>'

  $('dashboardStockAlerts').innerHTML = alerts.length
    ? alerts
        .map(
          product => `
        <div class="stock-alert">
          <div>
            <strong>${e(product.nombre)}</strong>
            <p>${productStock(product)} unidades disponibles</p>
          </div>
          <button type="button"
                  class="btn btn-outline"
                  data-action="edit-stock"
                  data-id="${e(product.id)}">
            Actualizar
          </button>
        </div>
      `
        )
        .join('')
    : `
      <div class="empty-state">
        <i class="fa-solid fa-circle-check"></i>
        <h3>Todo está en orden</h3>
        <p>No hay alertas de stock pendientes.</p>
      </div>
    `
}

/* CARGA DE FOTOGRAFÍAS */

function readImage (file) {
  return new Promise((resolve, reject) => {
    if (
      !file ||
      !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    ) {
      reject(new Error('Seleccioná una imagen JPG, PNG o WEBP.'))
      return
    }

    const reader = new FileReader()

    reader.onerror = () => reject(new Error('No se pudo leer la fotografía.'))

    reader.onload = () => {
      const img = new Image()

      img.onerror = () => reject(new Error('La fotografía no es válida.'))

      img.onload = () => {
        const scale = Math.min(1, 900 / img.width, 1200 / img.height)

        const canvas = document.createElement('canvas')

        canvas.width = Math.max(1, Math.round(img.width * scale))
        canvas.height = Math.max(1, Math.round(img.height * scale))

        const context = canvas.getContext('2d')

        context.fillStyle = '#FFFFFF'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.drawImage(img, 0, 0, canvas.width, canvas.height)

        resolve(canvas.toDataURL('image/jpeg', 0.72))
      }

      img.src = reader.result
    }

    reader.readAsDataURL(file)
  })
}

let formImages = []
let formColors = []
let formVariants = []
let uploadingImages = false

/* VISTA PREVIA DE FOTOGRAFÍAS */

function renderImagePreview () {
  $('imagePreview').innerHTML = formImages
    .map(
      (src, index) => `
    <div class="image-preview-item">
      <img src="${e(imagePath(src))}" alt="Fotografía ${index + 1}">

      <div class="image-preview-actions">
        <button type="button"
                class="btn btn-outline"
                data-action="main-image"
                data-index="${index}">
          ${index === 0 ? '★ Principal' : 'Elegir principal'}
        </button>

        <button type="button"
                class="icon-button"
                data-action="remove-image"
                data-index="${index}"
                aria-label="Eliminar fotografía">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  `
    )
    .join('')

  configureImages($('imagePreview'))
}

$('productImages').addEventListener('change', async event => {
  uploadingImages = true

  try {
    for (const file of event.target.files) {
      if (formImages.length >= 8) {
        notify(
          'Límite de fotografías',
          'La maqueta permite hasta 8 imágenes por producto.',
          'error'
        )
        break
      }

      formImages.push(await readImage(file))
    }
  } catch (error) {
    notify('Error al cargar imagen', error.message, 'error')
  } finally {
    renderImagePreview()
    uploadingImages = false
    event.target.value = ''
  }
})

/* TALLES */

function selectedSizes () {
  return [
    ...new Set(
      $$('input[name="productSize"]:checked').map(input => input.value)
    )
  ]
}

function addCustomSize (value) {
  const size = value.trim()

  if (!size) return

  const existing = $$('input[name="productSize"]').find(
    input => normalize(input.value) === normalize(size)
  )

  if (existing) {
    existing.checked = true
    syncVariants()
    return
  }

  const label = document.createElement('label')
  label.className = 'size-checkbox'

  label.innerHTML = `
    <input type="checkbox"
           name="productSize"
           value="${e(size)}"
           checked>
    <span>${e(size)}</span>
  `

  $('customSizesList').appendChild(label)
  syncVariants()
}

$('addCustomSize').addEventListener('click', () => {
  addCustomSize($('customSize').value)
  $('customSize').value = ''
})

$('customSize').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault()
    $('addCustomSize').click()
  }
})

$('productForm').addEventListener('change', event => {
  if (event.target.name === 'productSize') syncVariants()
})

/* COLORES */

function renderColors () {
  $('colorsList').innerHTML = formColors.length
    ? formColors
        .map(
          (color, index) => `
        <div class="color-item">
          <span class="color-swatch"
                style="display:inline-block;width:28px;height:28px;border-radius:50%;border:1px solid #DDD;background:${e(
                  color.hex
                )}">
          </span>

          <strong>${e(color.nombre)}</strong>
          <small>${e(color.hex.toUpperCase())}</small>

          <button type="button"
                  class="icon-button"
                  data-action="remove-color"
                  data-index="${index}"
                  aria-label="Eliminar color">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `
        )
        .join('')
    : '<p class="field-help">Todavía no agregaste colores.</p>'
}

$('addColor').addEventListener('click', () => {
  const name = $('colorName').value.trim()
  const hex = $('colorValue').value

  if (!name) {
    notify('Ingresá un color', 'Escribí el nombre del color.', 'error')
    return
  }

  if (formColors.some(c => normalize(c.nombre) === normalize(name))) {
    notify('Color repetido', 'Este color ya fue agregado.', 'error')
    return
  }

  formColors.push({ nombre: name, hex })

  $('colorName').value = ''

  renderColors()
  syncVariants()
})

$('colorName').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault()
    $('addColor').click()
  }
})

/* VARIANTES DE STOCK */

function syncVariants () {
  const sizes = selectedSizes()

  const previous = new Map(
    formVariants.map(variant => [
      JSON.stringify([variant.talle, variant.color]),
      variant.stock
    ])
  )

  formVariants = sizes.flatMap(talle =>
    formColors.map(color => ({
      talle,
      color: color.nombre,
      stock: previous.get(JSON.stringify([talle, color.nombre])) ?? 0
    }))
  )

  renderVariants()
}

function variantRows (variants, attribute) {
  return variants
    .map(
      (variant, index) => `
    <div class="variant-row">
      <div class="variant-info">
        <strong>Talle: ${e(variant.talle)}</strong>
        <span>Color: ${e(variant.color)}</span>
      </div>

      <div class="variant-stock">
        <label for="${attribute}-${index}">Unidades</label>

        <input id="${attribute}-${index}"
               type="number"
               min="0"
               step="1"
               value="${number(variant.stock)}"
               ${attribute}="${index}">
      </div>
    </div>
  `
    )
    .join('')
}

function renderVariants () {
  $('variantsContainer').innerHTML = formVariants.length
    ? variantRows(formVariants, 'data-variant')
    : `
      <div class="empty-state">
        <p>Seleccioná los talles y colores de la prenda.</p>
      </div>
    `

  updateProductTotal()
}

function updateProductTotal () {
  const total = formVariants.reduce(
    (sum, variant) => sum + number(variant.stock),
    0
  )

  $('totalProductStock').textContent = `${total} unidades`
}

$('generateVariants').addEventListener('click', () => {
  if (!selectedSizes().length || !formColors.length) {
    notify(
      'Faltan talles o colores',
      'Agregá al menos un talle y un color.',
      'error'
    )
    return
  }

  syncVariants()

  notify(
    'Combinaciones generadas',
    'Ya podés indicar el stock de cada variante.'
  )
})

$('variantsContainer').addEventListener('input', event => {
  if (!event.target.matches('[data-variant]')) return

  const index = Number(event.target.dataset.variant)

  formVariants[index].stock = number(event.target.value)

  updateProductTotal()
})

/* LIMPIAR FORMULARIO */

function resetProduct () {
  $('productForm').reset()
  $('editingProductId').value = ''
  $('productFormTitle').textContent = 'Agregar producto'

  $('publishProduct').innerHTML = `
    <i class="fa-solid fa-check"></i>
    Publicar producto
  `

  $('customSizesList').innerHTML = ''
  $('productFormMessage').textContent = ''

  formImages = []
  formColors = []
  formVariants = []

  renderImagePreview()
  renderColors()
  renderVariants()
}

$('resetProductForm').addEventListener('click', () => {
  confirmAction(
    'Cancelar edición',
    'Los cambios que todavía no guardaste se perderán.',
    () => {
      resetProduct()
      showSection('publicados')
    }
  )
})

/* GUARDAR Y PUBLICAR PRODUCTOS */

$('productForm').addEventListener('submit', event => {
  event.preventDefault()

  if (uploadingImages) {
    notify('Esperá un momento', 'Las fotografías se están cargando.', 'error')
    return
  }

  const status = event.submitter?.value === 'draft' ? 'draft' : 'published'

  const name = $('productName').value.trim()
  const category = $('productCategory').value
  const description = $('productDescription').value.trim()
  const price = number($('productPrice').value)

  const offer = $('productOfferPrice').value
    ? number($('productOfferPrice').value)
    : null

  const sizes = selectedSizes()

  if (status === 'published') {
    if (!name || !category || !description || price <= 0) {
      notify(
        'Información incompleta',
        'Completá el nombre, la categoría, la descripción y el precio.',
        'error'
      )
      return
    }

    if (!sizes.length || !formColors.length) {
      notify(
        'Faltan talles o colores',
        'Agregá las variantes antes de publicar.',
        'error'
      )
      return
    }
  }

  if (offer !== null && (offer <= 0 || offer >= price)) {
    notify(
      'Revisá el precio promocional',
      'Debe ser mayor a cero y menor al precio original.',
      'error'
    )
    return
  }

  syncVariants()

  const editingId = $('editingProductId').value
  const previous = db.products.find(p => p.id === editingId)

  const product = {
    id: editingId || uid(),
    nombre: name || 'Producto sin nombre',
    categoria: category,
    descripcion: description,
    codigo: $('productCode').value.trim(),
    material: $('productMaterial').value.trim(),
    precio: price,
    precioOferta: offer,
    imagen: formImages[0] || '',
    imagenes: [...formImages],
    talles: sizes,
    colores: formColors.map(color => ({ ...color })),
    variantes: formVariants.map(variant => ({ ...variant })),
    stock: formVariants.reduce(
      (total, variant) => total + number(variant.stock),
      0
    ),
    stockMinimo: number($('lowStockLimit').value),
    destacado: $('productBadge').value,
    featured: $('productFeatured').checked,
    visible: $('productVisible').checked,
    estado: status,
    creado: previous?.creado || Date.now(),
    actualizado: Date.now()
  }

  const saved = commit(() => {
    const index = db.products.findIndex(p => p.id === product.id)

    if (index >= 0) {
      db.products[index] = product
    } else {
      db.products.push(product)
    }
  })

  if (!saved) return

  resetProduct()

  showSection(status === 'draft' ? 'borradores' : 'publicados')

  notify(
    status === 'draft' ? 'Borrador guardado' : 'Producto publicado',
    'Los cambios se guardaron en la maqueta.'
  )
})

/* =========================================
   PARTE 2 DE 3
========================================= */

/* EDITAR PRODUCTO */

function editProduct (id) {
  const product = db.products.find(p => p.id === id)

  if (!product) return

  resetProduct()

  $('editingProductId').value = product.id
  $('productFormTitle').textContent = 'Editar producto'

  $('productName').value = product.nombre
  $('productCategory').value = product.categoria
  $('productDescription').value = product.descripcion
  $('productCode').value = product.codigo || ''
  $('productMaterial').value = product.material || ''
  $('productPrice').value = product.precio || ''
  $('productOfferPrice').value = product.precioOferta ?? ''
  $('lowStockLimit').value = product.stockMinimo ?? 3
  $('productBadge').value = product.destacado || ''
  $('productFeatured').checked = Boolean(product.featured)
  $('productVisible').checked = Boolean(product.visible)

  formImages = [...(product.imagenes || [])]

  formColors = (product.colores || []).map(color => ({
    ...color
  }))
  ;(product.talles || []).forEach(size => {
    const input = $$('input[name="productSize"]').find(
      item => item.value === size
    )

    if (input) {
      input.checked = true
    } else {
      addCustomSize(size)
    }
  })

  formVariants = (product.variantes || []).map(variant => ({
    ...variant
  }))

  renderImagePreview()
  renderColors()
  syncVariants()

  $('publishProduct').innerHTML = `
    <i class="fa-solid fa-check"></i>
    ${product.estado === 'draft' ? 'Publicar producto' : 'Guardar cambios'}
  `

  showSection('agregar')
}

/* =========================================
   ELIMINAR PRODUCTO
========================================= */

function deleteProduct (id) {
  const product = db.products.find(p => p.id === id)

  if (!product) return

  confirmAction(
    'Eliminar producto',
    `¿Querés eliminar "${product.nombre}"? Esta acción no se puede deshacer.`,
    () => {
      const saved = commit(() => {
        db.products = db.products.filter(p => p.id !== id)

        db.promotions.forEach(promotion => {
          promotion.products = (promotion.products || []).filter(
            productId => productId !== id
          )
        })
      })

      if (saved) {
        notify('Producto eliminado', 'El listado fue actualizado.')
      }
    }
  )
}

/* =========================================
   CAMBIAR VISIBILIDAD DE PRODUCTO
========================================= */

function toggleProduct (id) {
  const product = db.products.find(p => p.id === id)

  if (!product) return

  const saved = commit(() => {
    product.visible = !product.visible
    product.actualizado = Date.now()
  })

  if (saved) {
    notify(
      product.visible ? 'Producto visible' : 'Producto oculto',
      product.visible
        ? 'La prenda está visible en el catálogo de la maqueta.'
        : 'La prenda está oculta en el catálogo de la maqueta.'
    )
  }
}

/* =========================================
   ACCIONES DE PRODUCTOS
========================================= */

function productActions (product) {
  return `
    <div class="table-actions">

      <button
        type="button"
        class="icon-button edit-button"
        data-action="edit-product"
        data-id="${e(product.id)}"
        title="Editar producto"
        aria-label="Editar producto"
      >
        <i class="fa-solid fa-pen"></i>
      </button>

      <button
        type="button"
        class="icon-button"
        data-action="toggle-product"
        data-id="${e(product.id)}"
        title="${product.visible ? 'Ocultar' : 'Mostrar'} producto"
        aria-label="${product.visible ? 'Ocultar' : 'Mostrar'} producto"
      >
        <i class="fa-solid ${product.visible ? 'fa-eye-slash' : 'fa-eye'}"></i>
      </button>

      <button
        type="button"
        class="icon-button delete-button"
        data-action="delete-product"
        data-id="${e(product.id)}"
        title="Eliminar producto"
        aria-label="Eliminar producto"
      >
        <i class="fa-regular fa-trash-can"></i>
      </button>

    </div>
  `
}

/* =========================================
   PRODUCTOS PUBLICADOS
========================================= */

function renderPublished () {
  const search = normalize($('publishedSearch').value)
  const category = $('publishedCategory').value
  const visibility = $('publishedStatus').value
  const sort = $('publishedSort').value

  let products = publishedProducts().filter(product => {
    const matchesSearch =
      normalize(product.nombre).includes(search) ||
      normalize(product.codigo).includes(search)

    const matchesCategory = !category || product.categoria === category

    const matchesVisibility =
      !visibility ||
      (visibility === 'visible' && product.visible) ||
      (visibility === 'hidden' && !product.visible)

    return matchesSearch && matchesCategory && matchesVisibility
  })

  products.sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.nombre.localeCompare(b.nombre, 'es')

      case 'price-asc':
        return a.precio - b.precio

      case 'price-desc':
        return b.precio - a.precio

      case 'stock':
        return productStock(a) - productStock(b)

      default:
        return b.creado - a.creado
    }
  })

  $('publishedResults').textContent = `${products.length} ${
    products.length === 1 ? 'producto' : 'productos'
  }`

  $('publishedEmpty').hidden = products.length > 0

  /* TABLA PARA COMPUTADORAS Y TABLETS */

  $('publishedTableBody').innerHTML = products
    .map(
      product => `
      <tr>

        <td>
          <div class="table-product">

            ${productImage(product)}

            <div>
              <strong>${e(product.nombre)}</strong>
              <small>${e(product.codigo || '')}</small>
            </div>

          </div>
        </td>

        <td>
          ${e(product.categoria)}
        </td>

        <td>
          ${
            product.precioOferta
              ? `
                <small style="text-decoration:line-through">
                  ${money(product.precio)}
                </small>
                <br>
                <strong>${money(product.precioOferta)}</strong>
              `
              : money(product.precio)
          }
        </td>

        <td>
          ${stockBadge(product)}
        </td>

        <td>
          <span class="status-badge ${product.visible ? 'visible' : 'hidden'}">
            ${product.visible ? 'Visible' : 'Oculto'}
          </span>
        </td>

        <td>
          ${productActions(product)}
        </td>

      </tr>
    `
    )
    .join('')

  /* LISTADO ADAPTADO A CELULARES */

  $('publishedMobileList').innerHTML = products
    .map(
      product => `
      <article class="mobile-product-card">

        <div class="mobile-product-main">

          ${productImage(product)}

          <div class="mobile-product-info">

            <h3>${e(product.nombre)}</h3>

            <p>${e(product.categoria)}</p>

            ${
              product.precioOferta
                ? `
                  <small style="text-decoration:line-through">
                    ${money(product.precio)}
                  </small>
                  <strong>${money(product.precioOferta)}</strong>
                `
                : `<strong>${money(product.precio)}</strong>`
            }

            <p>${stockBadge(product)}</p>

            <small>
              ${product.visible ? 'Visible' : 'Oculto'}
            </small>

          </div>

        </div>

        <div class="mobile-product-actions">
          ${productActions(product)}
        </div>

      </article>
    `
    )
    .join('')

  configureImages($('publishedTableBody'))
  configureImages($('publishedMobileList'))
}

/* FILTROS DE PRODUCTOS PUBLICADOS */

;[
  'publishedSearch',
  'publishedCategory',
  'publishedStatus',
  'publishedSort'
].forEach(id => {
  $(id).addEventListener('input', renderPublished)
})

/* =========================================
   BORRADORES
========================================= */

function renderDrafts () {
  const search = normalize($('draftSearch').value)

  const drafts = draftProducts()
    .filter(product => normalize(product.nombre).includes(search))
    .sort((a, b) => b.creado - a.creado)

  $('draftsEmpty').hidden = drafts.length > 0

  $('draftsList').innerHTML = drafts
    .map(
      product => `
      <article class="panel-card draft-card">

        <div class="draft-image">
          ${productImage(product)}
        </div>

        <div class="draft-content">

          <span class="status-badge">
            Borrador
          </span>

          <h3>${e(product.nombre)}</h3>

          <p>
            ${e(product.categoria || 'Sin categoría')}
          </p>

          <strong>
            ${product.precio ? money(product.precio) : 'Sin precio'}
          </strong>

        </div>

        <div class="draft-actions">

          <button
            type="button"
            class="btn btn-primary"
            data-action="edit-product"
            data-id="${e(product.id)}"
          >
            Continuar edición
          </button>

          <button
            type="button"
            class="btn btn-danger-outline"
            data-action="delete-product"
            data-id="${e(product.id)}"
          >
            <i class="fa-regular fa-trash-can"></i>
            Eliminar
          </button>

        </div>

      </article>
    `
    )
    .join('')

  configureImages($('draftsList'))
}

$('draftSearch').addEventListener('input', renderDrafts)

/* =========================================
   CATEGORÍAS
========================================= */

let categoryImage = ''
let uploadingCategoryImage = false

/* ACTUALIZAR SELECTORES DE CATEGORÍAS */

function updateCategorySelects () {
  const selects = [
    ['productCategory', 'Seleccionar categoría'],
    ['publishedCategory', 'Todas las categorías'],
    ['stockCategory', 'Todas las categorías'],
    ['promotionCategory', 'Seleccionar categoría']
  ]

  selects.forEach(([id, placeholderText]) => {
    const select = $(id)
    const current = select.value

    select.innerHTML = `
      <option value="">
        ${placeholderText}
      </option>

      ${db.categories
        .map(
          category => `
          <option value="${e(category.nombre)}">
            ${e(category.nombre)}
          </option>
        `
        )
        .join('')}
    `

    const exists = [...select.options].some(option => option.value === current)

    select.value = exists ? current : ''
  })
}

/* =========================================
   MOSTRAR CATEGORÍAS
========================================= */

function renderCategories () {
  $('categoriesList').innerHTML = db.categories.length
    ? db.categories
        .map(category => {
          const count = publishedProducts().filter(
            product => product.categoria === category.nombre
          ).length

          return `
            <article class="panel-card admin-category-card">

              <div class="category-card-image">

                <img
                  src="${e(imagePath(category.imagen))}"
                  alt="${e(category.nombre)}"
                >

              </div>

              <div class="category-card-content">

                <h2>${e(category.nombre)}</h2>

                <p>${e(category.descripcion)}</p>

                <strong>
                  ${count} ${count === 1 ? 'producto' : 'productos'}
                </strong>

                <p>
                  <span class="status-badge ${
                    category.visible ? 'visible' : 'hidden'
                  }">
                    ${category.visible ? 'Visible' : 'Oculta'}
                  </span>
                </p>

              </div>

              <div class="category-card-actions">

                <button
                  type="button"
                  class="btn btn-outline"
                  data-action="edit-category"
                  data-id="${e(category.id)}"
                >
                  <i class="fa-solid fa-pen"></i>
                  Editar
                </button>

                <button
                  type="button"
                  class="btn btn-danger-outline"
                  data-action="delete-category"
                  data-id="${e(category.id)}"
                >
                  <i class="fa-regular fa-trash-can"></i>
                  Eliminar
                </button>

              </div>

            </article>
          `
        })
        .join('')
    : `
      <article class="panel-card empty-state">

        <i class="fa-solid fa-layer-group"></i>

        <h3>No hay categorías creadas</h3>

        <p>
          Creá una categoría para organizar tus productos.
        </p>

      </article>
    `

  configureImages($('categoriesList'))
}

/* =========================================
   AGREGAR Y EDITAR CATEGORÍAS
========================================= */

function openCategory (id = '') {
  $('categoryForm').reset()
  $('editingCategoryId').value = id

  categoryImage = ''

  const category = db.categories.find(c => c.id === id)

  $('categoryModalTitle').textContent = category
    ? 'Editar categoría'
    : 'Nueva categoría'

  if (category) {
    $('categoryName').value = category.nombre

    $('categoryDescription').value = category.descripcion || ''

    $('categoryVisible').checked = Boolean(category.visible)

    categoryImage = category.imagen || ''
  }

  renderCategoryPreview()

  $('categoryModal').showModal()
}

/* =========================================
   VISTA PREVIA DE CATEGORÍA
========================================= */

function renderCategoryPreview () {
  $('categoryModalPreview').innerHTML = categoryImage
    ? `
      <div class="image-preview-item">

        <img
          src="${e(imagePath(categoryImage))}"
          alt="Imagen de categoría"
        >

      </div>
    `
    : ''

  configureImages($('categoryModalPreview'))
}

$('openCategoryModal').addEventListener('click', () => {
  openCategory()
})

$('categoryImage').addEventListener('change', async event => {
  const file = event.target.files[0]

  if (!file) return

  uploadingCategoryImage = true

  try {
    categoryImage = await readImage(file)

    renderCategoryPreview()
  } catch (error) {
    notify('Error al cargar imagen', error.message, 'error')
  } finally {
    uploadingCategoryImage = false
    event.target.value = ''
  }
})

/* =========================================
   GUARDAR CATEGORÍA
========================================= */

$('categoryForm').addEventListener('submit', event => {
  event.preventDefault()

  if (uploadingCategoryImage) {
    notify(
      'Esperá un momento',
      'La fotografía todavía se está cargando.',
      'error'
    )
    return
  }

  const id = $('editingCategoryId').value || uid()
  const name = $('categoryName').value.trim()

  if (!name) {
    notify(
      'Información incompleta',
      'Ingresá el nombre de la categoría.',
      'error'
    )
    return
  }

  const duplicate = db.categories.some(
    category =>
      category.id !== id && normalize(category.nombre) === normalize(name)
  )

  if (duplicate) {
    notify(
      'Categoría repetida',
      'Ya existe una categoría con ese nombre.',
      'error'
    )
    return
  }

  const previous = db.categories.find(c => c.id === id)

  const category = {
    id,
    nombre: name,
    descripcion: $('categoryDescription').value.trim(),
    imagen: categoryImage,
    visible: $('categoryVisible').checked
  }

  const saved = commit(() => {
    if (previous) {
      /* ACTUALIZAR PRODUCTOS ASOCIADOS */

      db.products.forEach(product => {
        if (product.categoria === previous.nombre) {
          product.categoria = name
        }
      })

      /* ACTUALIZAR PROMOCIONES ASOCIADAS */

      db.promotions.forEach(promotion => {
        if (promotion.category === previous.nombre) {
          promotion.category = name
        }
      })

      db.categories = db.categories.map(c => (c.id === id ? category : c))
    } else {
      db.categories.push(category)
    }
  })

  if (!saved) return

  $('categoryModal').close()

  notify('Categoría guardada', 'Los cambios se realizaron correctamente.')
})

/* =========================================
   ELIMINAR CATEGORÍA
========================================= */

function deleteCategory (id) {
  const category = db.categories.find(c => c.id === id)

  if (!category) return

  const associatedProducts = db.products.some(
    product => product.categoria === category.nombre
  )

  if (associatedProducts) {
    notify(
      'No se puede eliminar',
      'Primero cambiá de categoría los productos asociados.',
      'error'
    )
    return
  }

  const associatedPromotions = db.promotions.some(
    promotion =>
      promotion.scope === 'category' && promotion.category === category.nombre
  )

  if (associatedPromotions) {
    notify(
      'No se puede eliminar',
      'Hay promociones asociadas a esta categoría.',
      'error'
    )
    return
  }

  confirmAction(
    'Eliminar categoría',
    `¿Querés eliminar la categoría "${category.nombre}"?`,
    () => {
      const saved = commit(() => {
        db.categories = db.categories.filter(item => item.id !== id)
      })

      if (saved) {
        notify(
          'Categoría eliminada',
          'El listado de categorías fue actualizado.'
        )
      }
    }
  )
}

/* =========================================
   CONTROL DE STOCK
========================================= */

function renderStock () {
  const published = publishedProducts()

  const totalUnits = published.reduce(
    (total, product) => total + productStock(product),
    0
  )

  const lowProducts = published.filter(isLowStock).length

  const emptyProducts = published.filter(
    product => productStock(product) === 0
  ).length

  $('stockTotalUnits').textContent = totalUnits

  $('stockLowProducts').textContent = lowProducts

  $('stockEmptyProducts').textContent = emptyProducts

  /* FILTROS */

  const search = normalize($('stockSearch').value)

  const category = $('stockCategory').value

  const status = $('stockStatus').value

  const products = published
    .filter(product => {
      const matchesSearch =
        normalize(product.nombre).includes(search) ||
        normalize(product.codigo).includes(search)

      const matchesCategory = !category || product.categoria === category

      const matchesStatus = !status || stockStatus(product) === status

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      return productStock(a) - productStock(b)
    })

  $('stockProductsList').innerHTML = products.length
    ? products
        .map(
          product => `
          <article class="stock-product-card">

            <div class="stock-product-main">

              <div class="stock-product-image">
                ${productImage(product)}
              </div>

              <div class="stock-product-info">

                <h3>${e(product.nombre)}</h3>

                <p>${e(product.categoria)}</p>

                <small>
                  ${e(product.codigo || '')}
                </small>

              </div>

            </div>

            <div class="stock-product-details">

              ${stockBadge(product)}

              <small>
                ${(product.variantes || []).length}
                combinaciones de talle y color
              </small>

            </div>

            <div class="stock-product-actions">

              <button
                type="button"
                class="btn btn-outline"
                data-action="edit-stock"
                data-id="${e(product.id)}"
              >
                <i class="fa-solid fa-pen"></i>
                Actualizar stock
              </button>

            </div>

          </article>
        `
        )
        .join('')
    : `
      <div class="empty-state">

        <i class="fa-solid fa-box-open"></i>

        <h3>No hay productos para mostrar</h3>

        <p>
          Modificá los filtros de búsqueda.
        </p>

      </div>
    `

  configureImages($('stockProductsList'))
}

/* =========================================
   FILTROS DE STOCK
========================================= */

;['stockSearch', 'stockCategory', 'stockStatus'].forEach(id => {
  $(id).addEventListener('input', renderStock)
})

/* =========================================
   VENTANA PARA ACTUALIZAR STOCK
========================================= */

let stockModalVariants = []

function openStock (id) {
  const product = db.products.find(p => p.id === id)

  if (!product) return

  $('stockProductId').value = product.id

  $('stockModalProductName').textContent = product.nombre

  stockModalVariants = (product.variantes || []).map(variant => ({
    talle: variant.talle,
    color: variant.color,
    stock: number(variant.stock)
  }))

  $('stockModalVariants').innerHTML = stockModalVariants.length
    ? variantRows(stockModalVariants, 'data-stock-variant')
    : `
        <div class="empty-state">

          <p>
            Este producto todavía no tiene combinaciones
            de talle y color.
          </p>

          <p>
            Editá el producto para agregarlas.
          </p>

        </div>
      `

  updateStockModalTotal()

  $('stockModal').showModal()
}

/* =========================================
   CALCULAR STOCK TOTAL DE LA VENTANA
========================================= */

function updateStockModalTotal () {
  const total = stockModalVariants.reduce(
    (sum, variant) => sum + number(variant.stock),
    0
  )

  $('stockModalTotal').textContent = `${total} ${
    total === 1 ? 'unidad' : 'unidades'
  }`
}

/* =========================================
   MODIFICAR CANTIDADES
========================================= */

$('stockModalVariants').addEventListener('input', event => {
  if (!event.target.matches('[data-stock-variant]')) {
    return
  }

  const index = Number(event.target.dataset.stockVariant)

  if (!stockModalVariants[index]) return

  stockModalVariants[index].stock = number(event.target.value)

  updateStockModalTotal()
})

/* =========================================
   GUARDAR STOCK
========================================= */

$('stockForm').addEventListener('submit', event => {
  event.preventDefault()

  const id = $('stockProductId').value

  const product = db.products.find(p => p.id === id)

  if (!product) return

  const variants = stockModalVariants.map(variant => ({
    talle: variant.talle,
    color: variant.color,
    stock: number(variant.stock)
  }))

  const total = variants.reduce((sum, variant) => sum + variant.stock, 0)

  const saved = commit(() => {
    product.variantes = variants

    product.stock = total

    product.actualizado = Date.now()
  })

  if (!saved) return

  $('stockModal').close()

  notify('Stock actualizado', 'Las cantidades fueron guardadas.')
})

/* =========================================
   PARTE 3 DE 3
   PROMOCIONES
========================================= */

function updatePromotionFields () {
  const type = $('promotionType').value
  const scope = $('promotionScope').value

  $('promotionValueGroup').hidden = type === 'announcement'

  $('promotionValue').disabled = type === 'announcement'

  $('promotionValue').required = type !== 'announcement'

  if (type === 'percentage') {
    $('promotionValue').max = '100'
  } else {
    $('promotionValue').removeAttribute('max')
  }

  $('promotionCategoryGroup').hidden = scope !== 'category'

  $('promotionCategory').required = scope === 'category'

  $('promotionProductsGroup').hidden = scope !== 'products'
}

$('promotionType').addEventListener('change', updatePromotionFields)

$('promotionScope').addEventListener('change', updatePromotionFields)

/* =========================================
   CREAR Y EDITAR PROMOCIONES
========================================= */

function openPromotion (id = '') {
  $('promotionForm').reset()

  $('editingPromotionId').value = id

  const promotion = db.promotions.find(p => p.id === id)

  $('promotionModalTitle').textContent = promotion
    ? 'Editar promoción'
    : 'Nueva promoción'

  $('promotionProductOptions').innerHTML = publishedProducts()
    .map(
      product => `
        <label class="size-checkbox">

          <input
            type="checkbox"
            name="promotionProduct"
            value="${e(product.id)}"
            ${(promotion?.products || []).includes(product.id) ? 'checked' : ''}
          >

          <span>${e(product.nombre)}</span>

        </label>
      `
    )
    .join('')

  if (promotion) {
    $('promotionName').value = promotion.name

    $('promotionDescription').value = promotion.description || ''

    $('promotionType').value = promotion.type

    $('promotionValue').value = promotion.value ?? ''

    $('promotionScope').value = promotion.scope

    $('promotionCategory').value = promotion.category || ''

    $('promotionStart').value = promotion.start || ''

    $('promotionEnd').value = promotion.end || ''

    $('promotionActive').checked = Boolean(promotion.active)
  }

  updatePromotionFields()

  $('promotionModal').showModal()
}

$('openPromotionModal').addEventListener('click', () => {
  openPromotion()
})

/* =========================================
   GUARDAR PROMOCIÓN
========================================= */

$('promotionForm').addEventListener('submit', event => {
  event.preventDefault()

  const type = $('promotionType').value

  const scope = $('promotionScope').value

  const value = number($('promotionValue').value)

  const start = $('promotionStart').value

  const end = $('promotionEnd').value

  const name = $('promotionName').value.trim()

  const products = $$('input[name="promotionProduct"]:checked').map(
    input => input.value
  )

  if (!name) {
    notify(
      'Información incompleta',
      'Ingresá el nombre de la promoción.',
      'error'
    )

    return
  }

  if (start && end && end < start) {
    notify(
      'Revisá las fechas',
      'La fecha de finalización no puede ser anterior al inicio.',
      'error'
    )

    return
  }

  if (
    type !== 'announcement' &&
    (value <= 0 || (type === 'percentage' && value > 100))
  ) {
    notify('Descuento inválido', 'Revisá el valor ingresado.', 'error')

    return
  }

  if (scope === 'category' && !$('promotionCategory').value) {
    notify(
      'Seleccioná una categoría',
      'Elegí la categoría que tendrá la promoción.',
      'error'
    )

    return
  }

  if (scope === 'products' && !products.length) {
    notify(
      'Seleccioná productos',
      'Elegí las prendas que tendrán la promoción.',
      'error'
    )

    return
  }

  const promotion = {
    id: $('editingPromotionId').value || uid(),

    name,

    description: $('promotionDescription').value.trim(),

    type,

    value: type === 'announcement' ? null : value,

    scope,

    category: scope === 'category' ? $('promotionCategory').value : '',

    products: scope === 'products' ? products : [],

    start,

    end,

    active: $('promotionActive').checked
  }

  const saved = commit(() => {
    const index = db.promotions.findIndex(p => p.id === promotion.id)

    if (index >= 0) {
      db.promotions[index] = promotion
    } else {
      db.promotions.push(promotion)
    }
  })

  if (!saved) return

  $('promotionModal').close()

  notify('Promoción guardada', 'La promoción fue registrada en el panel.')
})

/* =========================================
   ESTADO DE LAS PROMOCIONES
========================================= */

function promotionStatus (promotion) {
  const now = new Date()

  const today = [
    now.getFullYear(),

    String(now.getMonth() + 1).padStart(2, '0'),

    String(now.getDate()).padStart(2, '0')
  ].join('-')

  if (!promotion.active) {
    return 'Inactiva'
  }

  if (promotion.start && today < promotion.start) {
    return 'Programada'
  }

  if (promotion.end && today > promotion.end) {
    return 'Finalizada'
  }

  return 'Activa'
}

/* =========================================
   MOSTRAR PROMOCIONES
========================================= */

function renderPromotions () {
  $('promotionsEmpty').hidden = db.promotions.length > 0

  $('promotionsList').innerHTML = db.promotions
    .map(promotion => {
      const discount =
        promotion.type === 'percentage'
          ? `${promotion.value}% OFF`
          : promotion.type === 'fixed'
          ? `${money(promotion.value)} de descuento`
          : 'Novedad'

      const scope =
        promotion.scope === 'all'
          ? 'Todos los productos'
          : promotion.scope === 'category'
          ? promotion.category
          : `${(promotion.products || []).length} productos seleccionados`

      return `
          <article class="promotion-card">

            <div class="promotion-info">

              <span class="status-badge">
                ${promotionStatus(promotion)}
              </span>

              <h3>
                ${e(promotion.name)}
              </h3>

              <strong>
                ${e(discount)}
              </strong>

              <p>
                ${e(promotion.description)}
              </p>

              <p>
                Aplicación: ${e(scope)}
              </p>

              <small>
                ${e(promotion.start || 'Sin fecha de inicio')}
                —
                ${e(promotion.end || 'Sin fecha de finalización')}
              </small>

            </div>

            <div class="promotion-actions">

              <button
                type="button"
                class="btn btn-outline"
                data-action="edit-promotion"
                data-id="${e(promotion.id)}"
              >
                <i class="fa-solid fa-pen"></i>
                Editar
              </button>

              <button
                type="button"
                class="btn btn-outline"
                data-action="toggle-promotion"
                data-id="${e(promotion.id)}"
              >
                ${promotion.active ? 'Desactivar' : 'Activar'}
              </button>

              <button
                type="button"
                class="btn btn-danger-outline"
                data-action="delete-promotion"
                data-id="${e(promotion.id)}"
              >
                <i class="fa-regular fa-trash-can"></i>
                Eliminar
              </button>

            </div>

          </article>
        `
    })
    .join('')
}

/* =========================================
   ACTIVAR Y DESACTIVAR PROMOCIONES
========================================= */

function togglePromotion (id) {
  const promotion = db.promotions.find(p => p.id === id)

  if (!promotion) return

  const saved = commit(() => {
    promotion.active = !promotion.active
  })

  if (saved) {
    notify(
      promotion.active ? 'Promoción activada' : 'Promoción desactivada',

      'El estado de la promoción fue actualizado.'
    )
  }
}

/* =========================================
   ELIMINAR PROMOCIONES
========================================= */

function deletePromotion (id) {
  const promotion = db.promotions.find(p => p.id === id)

  if (!promotion) return

  confirmAction(
    'Eliminar promoción',

    `¿Querés eliminar la promoción "${promotion.name}"?`,

    () => {
      const saved = commit(() => {
        db.promotions = db.promotions.filter(p => p.id !== id)
      })

      if (saved) {
        notify(
          'Promoción eliminada',
          'El listado de promociones fue actualizado.'
        )
      }
    }
  )
}

/* =========================================
   BARRA DE NOVEDADES
========================================= */

$('announcementForm').addEventListener('submit', event => {
  event.preventDefault()

  const saved = commit(() => {
    db.announcement = {
      text: $('announcementText').value.trim(),

      visible: $('announcementVisible').checked
    }
  })

  if (saved) {
    notify('Mensaje guardado', 'La barra de novedades fue configurada.')
  }
})

/* =========================================
   PERSONALIZACIÓN DE LA TIENDA
========================================= */

const customizationFields = [
  'heroEyebrow',
  'heroTitle',
  'heroDescription',
  'heroButtonText',
  'aboutTitle',
  'aboutDescription',
  'aboutSecondParagraph',
  'sizeGuideText'
]

const customizationImages = [
  ['heroUpload', 'heroPreview', 'heroImage'],

  ['babyCategoryUpload', 'babyCategoryPreview', 'babyImage'],

  ['girlCategoryUpload', 'girlCategoryPreview', 'girlImage'],

  ['boyCategoryUpload', 'boyCategoryPreview', 'boyImage'],

  ['aboutUpload', 'aboutPreview', 'aboutImage']
]

let pendingCustomizationImages = {}

let pendingUploads = 0

/* =========================================
   ACTUALIZAR VISTAS PREVIAS
========================================= */

function setCustomizationPreview (previewId, image) {
  const preview = $(previewId)

  if (!preview) return

  const src = imagePath(image)

  if (preview.tagName === 'IMG') {
    preview.src = src
  } else {
    preview.innerHTML = `
      <img
        src="${e(src)}"
        alt="Vista previa"
      >
    `

    configureImages(preview)
  }
}

/* =========================================
   CARGAR IMÁGENES DE PERSONALIZACIÓN
========================================= */

customizationImages.forEach(([uploadId, previewId, key]) => {
  $(uploadId).addEventListener('change', async event => {
    const file = event.target.files[0]

    if (!file) return

    pendingUploads++

    try {
      const image = await readImage(file)

      pendingCustomizationImages[key] = image

      setCustomizationPreview(previewId, image)
    } catch (error) {
      notify('Error al cargar imagen', error.message, 'error')
    } finally {
      pendingUploads--

      event.target.value = ''
    }
  })
})

/* =========================================
   GUÍA DE TALLES
========================================= */

function renderSizeGuidePreview (image) {
  const preview = $('sizeGuidePreview')

  if (!preview) return

  preview.innerHTML = image
    ? `
      <div class="image-preview-item">

        <img
          src="${e(imagePath(image))}"
          alt="Guía de talles"
        >

        <button
          type="button"
          class="btn btn-danger-outline"
          data-action="remove-size-guide"
        >
          <i class="fa-regular fa-trash-can"></i>
          Eliminar imagen
        </button>

      </div>
    `
    : ''

  configureImages(preview)
}

/* =========================================
   CARGAR IMAGEN DE GUÍA DE TALLES
========================================= */

$('sizeGuideUpload').addEventListener('change', async event => {
  const file = event.target.files[0]

  if (!file) return

  pendingUploads++

  try {
    const image = await readImage(file)

    pendingCustomizationImages.sizeGuideImage = image

    renderSizeGuidePreview(image)
  } catch (error) {
    notify('Error al cargar imagen', error.message, 'error')
  } finally {
    pendingUploads--

    event.target.value = ''
  }
})

/* =========================================
   GUARDAR PERSONALIZACIÓN
========================================= */

$('customizationForm').addEventListener('submit', event => {
  event.preventDefault()

  if (pendingUploads > 0) {
    notify(
      'Esperá un momento',
      'Las imágenes todavía se están cargando.',
      'error'
    )

    return
  }

  const values = {}

  customizationFields.forEach(id => {
    values[id] = $(id).value.trim()
  })

  const saved = commit(() => {
    db.customization = {
      ...db.customization,

      ...values,

      ...pendingCustomizationImages
    }
  })

  if (!saved) return

  pendingCustomizationImages = {}

  $('customizationMessage').textContent = 'Cambios guardados correctamente.'

  notify('Personalización guardada', 'La configuración quedó almacenada.')
})

/* =========================================
   CONFIGURACIÓN GENERAL DEL NEGOCIO
========================================= */

const settingsFields = [
  'businessName',
  'businessSubtitle',
  'businessAddress',
  'businessGallery',
  'businessCity',
  'businessHours',
  'businessWhatsapp',
  'businessInstagram',
  'businessEmail',
  'businessFacebook',
  'businessMaps',
  'settingsShowPrices',
  'settingsShowOutOfStock',
  'settingsShowWhatsapp'
]

/* =========================================
   GUARDAR CONFIGURACIÓN
========================================= */

$('settingsForm').addEventListener('submit', event => {
  event.preventDefault()

  const whatsapp = $('businessWhatsapp').value.trim()

  if (whatsapp && !/^\d{8,15}$/.test(whatsapp)) {
    notify(
      'Revisá el número de WhatsApp',

      'Ingresalo con código de país y área, sin espacios ni símbolos.',

      'error'
    )

    return
  }

  const settings = {}

  settingsFields.forEach(id => {
    const input = $(id)

    settings[id] =
      input.type === 'checkbox' ? input.checked : input.value.trim()
  })

  const saved = commit(() => {
    db.settings = settings
  })

  if (!saved) return

  $('settingsMessage').textContent = 'Configuración guardada correctamente.'

  notify('Configuración guardada', 'Los datos del negocio fueron actualizados.')
})

/* =========================================
   RECUPERAR CONFIGURACIONES GUARDADAS
========================================= */

function loadSettingsForms () {
  $('announcementText').value = db.announcement?.text || ''

  $('announcementVisible').checked = db.announcement?.visible ?? true

  /* RECUPERAR TEXTOS PERSONALIZADOS */

  customizationFields.forEach(id => {
    if (db.customization?.[id] !== undefined) {
      $(id).value = db.customization[id]
    }
  })

  /* RECUPERAR IMÁGENES PERSONALIZADAS */

  customizationImages.forEach(([, previewId, key]) => {
    if (db.customization?.[key]) {
      setCustomizationPreview(previewId, db.customization[key])
    }
  })

  /* RECUPERAR GUÍA DE TALLES */

  renderSizeGuidePreview(db.customization?.sizeGuideImage)

  /* RECUPERAR CONFIGURACIÓN DEL NEGOCIO */

  settingsFields.forEach(id => {
    const value = db.settings?.[id]

    if (value === undefined) return

    const input = $(id)

    if (input.type === 'checkbox') {
      input.checked = Boolean(value)
    } else {
      input.value = value
    }
  })
}

/* =========================================
   ACCIONES DINÁMICAS DE LOS BOTONES
========================================= */

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]')

  if (!button) return

  const action = button.dataset.action

  const id = button.dataset.id

  const index = Number(button.dataset.index)

  switch (action) {
    /* EDITAR PRODUCTO */

    case 'edit-product':
      editProduct(id)

      break

    /* ELIMINAR PRODUCTO */

    case 'delete-product':
      deleteProduct(id)

      break

    /* MOSTRAR U OCULTAR PRODUCTO */

    case 'toggle-product':
      toggleProduct(id)

      break

    /* ELEGIR IMAGEN PRINCIPAL */

    case 'main-image': {
      if (!formImages[index]) break

      const image = formImages.splice(index, 1)[0]

      formImages.unshift(image)

      renderImagePreview()

      break
    }

    /* ELIMINAR IMAGEN */

    case 'remove-image':
      if (Number.isInteger(index) && index >= 0 && index < formImages.length) {
        formImages.splice(index, 1)

        renderImagePreview()
      }

      break

    /* ELIMINAR COLOR */

    case 'remove-color':
      if (Number.isInteger(index) && index >= 0 && index < formColors.length) {
        formColors.splice(index, 1)

        renderColors()

        syncVariants()
      }

      break

    /* EDITAR CATEGORÍA */

    case 'edit-category':
      openCategory(id)

      break

    /* ELIMINAR CATEGORÍA */

    case 'delete-category':
      deleteCategory(id)

      break

    /* EDITAR STOCK */

    case 'edit-stock':
      openStock(id)

      break

    /* EDITAR PROMOCIÓN */

    case 'edit-promotion':
      openPromotion(id)

      break

    /* ACTIVAR O DESACTIVAR PROMOCIÓN */

    case 'toggle-promotion':
      togglePromotion(id)

      break

    /* ELIMINAR PROMOCIÓN */

    case 'delete-promotion':
      deletePromotion(id)

      break

    /* ELIMINAR GUÍA DE TALLES */

    case 'remove-size-guide':
      pendingCustomizationImages.sizeGuideImage = ''

      renderSizeGuidePreview('')

      break
  }
})

/* =========================================
   RESTABLECER DATOS DE DEMOSTRACIÓN
========================================= */

$('resetDemo').addEventListener('click', () => {
  confirmAction(
    'Restablecer datos de demostración',

    'Se eliminarán los cambios, fotografías y productos guardados en este panel. Se recuperarán los datos iniciales.',

    () => {
      try {
        localStorage.removeItem(STORAGE_KEY)

        window.location.reload()
      } catch (error) {
        notify(
          'No se pudo restablecer',

          'Revisá los permisos de almacenamiento del navegador.',

          'error'
        )
      }
    }
  )
})

/* =========================================
   CERRAR VENTANAS MODALES
========================================= */

$$('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return

    const rect = dialog.getBoundingClientRect()

    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom

    if (outside) {
      if (dialog.id === 'confirmModal') {
        pendingConfirmation = null
      }

      dialog.close()
    }
  })
})

/* =========================================
   ACTUALIZAR PANEL COMPLETO
========================================= */

function renderAll () {
  updateCategorySelects()

  renderDashboard()

  renderPublished()

  renderDrafts()

  renderCategories()

  renderStock()

  renderPromotions()

  configureImages()
}

/* =========================================
   COMPATIBILIDAD DE LOS FILTROS
========================================= */

function normalizeFilterOptions () {
  const filterIds = ['publishedStatus', 'stockStatus']

  filterIds.forEach(id => {
    const select = $(id)

    if (!select) return

    const allOption = [...select.options].find(option => option.value === 'all')

    if (allOption) {
      allOption.value = ''
    }
  })
}

/* =========================================
   INICIALIZAR PANEL ADMINISTRATIVO
========================================= */

function initAdmin () {
  console.log('Corazón de Melón - Iniciando panel administrativo')

  closeSidebar()

  normalizeFilterOptions()

  loadSettingsForms()

  resetProduct()

  showSection('inicio')

  console.log('Panel administrativo cargado correctamente.')

  console.log('Productos publicados:', publishedProducts().length)

  console.log('Categorías:', db.categories.length)
}

/* =========================================
   EJECUTAR PANEL ADMINISTRATIVO
========================================= */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdmin, { once: true })
} else {
  initAdmin()
}

/* =========================================
   FIN DE LA PARTE 3 DE 3

   CORAZÓN DE MELÓN
   Panel administrativo
   Desarrollo y diseño web - Lucila Studio
========================================= */

import type { Product } from '../types'

export const products: Product[] = [
  {
    id: 'audifonos-campus',
    name: 'Audífonos Bluetooth Campus',
    description:
      'Auriculares inalámbricos ligeros con 30 horas de batería, micrófono para clases virtuales y estuche compacto que cabe en la mochila.',
    category: 'audio',
    price: 89,
    originalPrice: 129,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'parlante-estudio',
    name: 'Mini parlante Estudio',
    description:
      'Parlante portátil con sonido claro para grupos de estudio. Resistente a salpicaduras y con 12 horas de reproducción.',
    category: 'audio',
    price: 79,
    originalPrice: 79,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'mouse-silencioso',
    name: 'Mouse inalámbrico silencioso',
    description:
      'Mouse ergonómico con clic silencioso para bibliotecas y salas de lectura. Receptor USB-C y autonomía de 4 meses.',
    category: 'accesorios',
    price: 45,
    originalPrice: 59,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'hub-usbc',
    name: 'Hub USB-C 6 en 1',
    description:
      'Expande tu laptop con HDMI, USB-A, lector SD y carga. Ideal para presentaciones y laboratorios de cómputo.',
    category: 'accesorios',
    price: 69,
    originalPrice: 99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'teclado-compacto',
    name: 'Teclado compacto para laptop',
    description:
      'Teclado inalámbrico de 75% con teclas de perfil bajo. Ocupa poco espacio en el escritorio del dormitorio.',
    category: 'computacion',
    price: 159,
    originalPrice: 159,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'soporte-laptop',
    name: 'Soporte plegable para laptop',
    description:
      'Base de aluminio ajustable que mejora la postura en largas jornadas de estudio. Se pliega y no agrega peso a la mochila.',
    category: 'computacion',
    price: 55,
    originalPrice: 75,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'webcam-clases',
    name: 'Webcam Full HD para clases',
    description:
      'Cámara 1080p con micrófono dual y tapa de privacidad. Enfocada para exposiciones y tutorías en línea.',
    category: 'computacion',
    price: 119,
    originalPrice: 149,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1650017067794-80fd3a99a104?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'tablet-campus',
    name: 'Tablet Campus 10"',
    description:
      'Tablet de 10 pulgadas para clases, lecturas y apuntes. Wi-Fi, 128 GB y funda incluida. Cabe en la mochila sin agregar peso.',
    category: 'computacion',
    price: 699,
    originalPrice: 849,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'mousepad-xl',
    name: 'Mousepad gaming XL',
    description:
      'Superficie amplia y antideslizante para estudio y partidas cortas. Fácil de enrollar y guardar.',
    category: 'gaming',
    price: 39,
    originalPrice: 39,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'control-dualplay',
    name: 'Control inalámbrico DualPlay',
    description:
      'Gamepad compatible con PC para descansos entre tareas. Batería recargable y agarre texturizado.',
    category: 'gaming',
    price: 189,
    originalPrice: 229,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
]

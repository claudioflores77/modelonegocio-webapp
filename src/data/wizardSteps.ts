import type { CanvasBlockId } from '../types/canvas';

export interface WizardStepData {
  stepIndex: number;
  blockId: CanvasBlockId;
  titulo: string;
  preguntaCentral: string;
  preguntasGuiadas: string[];
  dinamicaNombre: string;
  dinamicaDescripcion: string;
  alertaUX?: string;
  ejemplosPorRubro: {
    rubro: string;
    ejemplos: string[];
  }[];
  etiquetasSugeridas?: string[];
}

export const WIZARD_STEPS: WizardStepData[] = [
  {
    stepIndex: 1,
    blockId: 'segmentosClientes',
    titulo: '1. Personas a las que querés ayudar',
    preguntaCentral: '¿Quién tiene el problema que querés resolver y estaría dispuesto a pagar por una solución?',
    preguntasGuiadas: [
      '¿Quién usaría tu producto o servicio?',
      '¿Quién toma la decisión de compra y quién paga?',
      '¿Qué edad, actividad, ubicación o situación tienen?',
      '¿Qué problema viven hoy y qué alternativa usan actualmente?',
      '¿Qué tipo de cliente te interesa atender primero?'
    ],
    dinamicaNombre: 'Cliente Prioritario (Próximos 90 días)',
    dinamicaDescripcion: 'Completa la frase: "Mi cliente prioritario es [PERFIL] que necesita [NECESIDAD] porque actualmente [DOLOR]."',
    alertaUX: 'Si escribiste "todos", "cualquiera" o "empresas en general", probá elegir un grupo más específico. ¡Podrás sumar otros segmentos más adelante!',
    ejemplosPorRubro: [
      {
        rubro: 'Servicios Profesionales / Asesoría',
        ejemplos: [
          'Emprendedoras de servicios de 28 a 45 años que venden por Instagram',
          'Pymes locales que necesitan ordenar sus impuestos y no tienen contador interno'
        ]
      },
      {
        rubro: 'Gastronomía / Cafetería',
        ejemplos: [
          'Trabajadores remotos que buscan café de especialidad y buen Wi-Fi por la tarde',
          'Vecinos del barrio que compran viandas saludables para la semana'
        ]
      },
      {
        rubro: 'Comercio / Indumentaria',
        ejemplos: [
          'Madres jóvenes que buscan ropa infantil sustentable y duradera',
          'Deportistas que entrenan al aire libre y buscan accesorios resistentes'
        ]
      }
    ],
    etiquetasSugeridas: ['cliente-prioritario', 'usuario', 'comprador', 'b2b', 'b2c']
  },
  {
    stepIndex: 2,
    blockId: 'propuestaValor',
    titulo: '2. Tu propuesta de valor y beneficio',
    preguntaCentral: '¿Qué resultado valioso logra tu cliente gracias a vos?',
    preguntasGuiadas: [
      '¿Qué problema, frustración o necesidad resolvés?',
      '¿Qué ofrece exactamente tu solución (producto, servicio, ahorro de tiempo, tranquilidad)?',
      '¿Qué hace diferente a tu propuesta frente a lo que usan hoy?',
      '¿Por qué te elegirían a vos y no a la competencia?'
    ],
    dinamicaNombre: 'Fórmula Antes y Después',
    dinamicaDescripcion: 'Transformación: "Ayudo a [CLIENTE] a lograr [RESULTADO] sin [DOLOR] mediante [SOLUCIÓN]."',
    alertaUX: 'Evitá listar solo características técnicas (ej: "sesión de 2 horas"). Enfocate en los beneficios reales (ej: "claridad para saber qué vender y ganar tiempo").',
    ejemplosPorRubro: [
      {
        rubro: 'Servicios Profesionales / Asesoría',
        ejemplos: [
          'Acompañamiento práctico para estructurar tu oferta y conseguir clientes en 30 días',
          'Tranquilidad impositiva sin burocracia ni sorpresas al final del mes'
        ]
      },
      {
        rubro: 'Gastronomía / Cafetería',
        ejemplos: [
          'Café de alta calidad servido rápido en un ambiente cómodo para trabajar',
          'Comida casera nutritiva lista para calentar y disfrutar en minutos'
        ]
      },
      {
        rubro: 'Comercio / Productos',
        ejemplos: [
          'Ropa de diseño consciente que dura más de una temporada sin perder color',
          'Envío express garantizado en 24h con empaque listo para regalo'
        ]
      }
    ],
    etiquetasSugeridas: ['beneficio-clave', 'diferencial', 'ahorro-tiempo', 'tranquilidad']
  },
  {
    stepIndex: 3,
    blockId: 'canales',
    titulo: '3. Canales de llegada, venta y entrega',
    preguntaCentral: '¿Cómo va a encontrarte, confiar en vos, comprarte y recibir lo que ofrecés?',
    preguntasGuiadas: [
      '¿Dónde se entera de que existís (redes, recomendaciones, publicidad, buscador)?',
      '¿Dónde consulta sus dudas y por qué medio compra o contrata?',
      '¿Cómo recibe el producto o servicio (online, envío postal, local presencial)?',
      '¿Qué canal te resulta más simple y económico para empezar?'
    ],
    dinamicaNombre: 'Mapa del camino de compra',
    dinamicaDescripcion: 'Definí notas para los 5 pasos: 1. Descubre | 2. Investiga | 3. Consulta | 4. Compra | 5. Recibe',
    ejemplosPorRubro: [
      {
        rubro: 'Canales Online',
        ejemplos: [
          'Descubrimiento: Reels de Instagram y recomendaciones de clientes',
          'Consulta y Venta: Mensajes de WhatsApp Business y link de pago Mercado Pago',
          'Entrega: Sesiones en vivo por Zoom + carpeta compartida en Drive'
        ]
      },
      {
        rubro: 'Canales Físicos / Mixtos',
        ejemplos: [
          'Descubrimiento: Cartelera local y Google Maps',
          'Venta: Venta directa en mostrador y pedidos por WhatsApp',
          'Entrega: Retiro en local o envío por mensajería en moto'
        ]
      }
    ],
    etiquetasSugeridas: ['descubrimiento', 'venta', 'entrega', 'online', 'presencial']
  },
  {
    stepIndex: 4,
    blockId: 'relacionesClientes',
    titulo: '4. Relación y experiencia con clientes',
    preguntaCentral: '¿Qué experiencia querés que tenga tu cliente antes, durante y después de comprar?',
    preguntasGuiadas: [
      '¿Cómo respondés las consultas? ¿Qué tan rápida es tu respuesta?',
      '¿La atención es 100% personalizada, automatizada o mixta?',
      '¿Cómo acompañás al cliente durante la experiencia de uso?',
      '¿Qué hacés para que vuelva a comprarte o te recomiende?'
    ],
    dinamicaNombre: '3 Momentos de Confianza',
    dinamicaDescripcion: 'Definí acciones para: Antes de comprar (confianza) -> Durante la compra (sin fricción) -> Después (fidelización)',
    ejemplosPorRubro: [
      {
        rubro: 'Experiencia y Fidelización',
        ejemplos: [
          'Antes: Compartir testimonios y casos de éxito reales',
          'Durante: Respuesta por WhatsApp en menos de 15 minutos en horario comercial',
          'Después: Mensaje a los 7 días para consultar cómo le fue + cupón de descuento para próxima compra'
        ]
      }
    ],
    etiquetasSugeridas: ['atencion-personalizada', 'postventa', 'fidelizacion', 'automatizado']
  },
  {
    stepIndex: 5,
    blockId: 'fuentesIngresos',
    titulo: '5. Fuentes de ingresos y precios',
    preguntaCentral: '¿Por qué te van a pagar y de qué forma entra el dinero al negocio?',
    preguntasGuiadas: [
      '¿Qué vendés exactamente y cuánto paga el cliente aproximadamente?',
      '¿Paga una sola vez, por suscripción mensual, por proyecto o comisión?',
      '¿Qué producto o servicio te deja el mejor margen de ganancia?',
      '¿Qué producto secundario podrías venderle al mismo cliente?'
    ],
    dinamicaNombre: 'Escalera de Ofertas',
    dinamicaDescripcion: 'Niveles: Entrada (bajo riesgo) -> Oferta Principal -> Versión Premium / Recurrente',
    ejemplosPorRubro: [
      {
        rubro: 'Servicios',
        ejemplos: [
          'Oferta de Entrada: Auditoría express de perfil',
          'Oferta Principal: Servicio completo mensual de gestión',
          'Oferta Premium: Mentoría personalizada 1 a 1'
        ]
      },
      {
        rubro: 'Productos / Comercio',
        ejemplos: [
          'Venta de producto unitario a precio minorista',
          'Combo de 3 productos con descuento especial',
          'Suscripción mensual de reposición automática con envío gratis'
        ]
      }
    ],
    etiquetasSugeridas: ['pago-unico', 'suscripcion', 'oferta-principal', 'servicio', 'producto']
  },
  {
    stepIndex: 6,
    blockId: 'recursosClave',
    titulo: '6. Recursos clave indispensable',
    preguntaCentral: '¿Qué necesitás tener o controlar para cumplir tu promesa al cliente?',
    preguntasGuiadas: [
      '¿Qué conocimientos, habilidades o personas son indispensables?',
      '¿Qué equipamiento, local, herramientas o software necesitás?',
      '¿Qué marca, base de datos, contactos o permisos son esenciales?',
      '¿Qué recurso ya tenés y cuál tenés que conseguir o alquilar?'
    ],
    dinamicaNombre: 'Ya tengo vs. Necesito conseguir',
    dinamicaDescripcion: 'Clasificá cada recurso en: Tengo actualmente / Tercerizable / A conseguir',
    ejemplosPorRubro: [
      {
        rubro: 'Ejemplos de Recursos',
        ejemplos: [
          'Conocimiento técnico especializado en la temática',
          'Computadora, celular con buena cámara y conexión a internet',
          'Plataforma de correo y sistema de cobranza online',
          'Capital inicial para primeras 50 unidades de stock'
        ]
      }
    ],
    etiquetasSugeridas: ['ya-tengo', 'necesito-conseguir', 'herramienta', 'persona', 'espacio']
  },
  {
    stepIndex: 7,
    blockId: 'actividadesClave',
    titulo: '7. Actividades clave de operación',
    preguntaCentral: '¿Qué tareas tenés que ejecutar bien para entregar valor y cobrar por ello?',
    preguntasGuiadas: [
      '¿Qué tenés que hacer para preparar o fabricar el producto/servicio?',
      '¿Qué actividades semanales hacés para atraer y vender?',
      '¿Qué tareas hacés para entregar, cobrar y atender al cliente?',
      '¿Qué actividad te lleva más tiempo y podría delegarse o automatizarse?'
    ],
    dinamicaNombre: 'El Ciclo Semanal del Negocio',
    dinamicaDescripcion: 'Etapas: 1. Crear | 2. Comunicar | 3. Vender | 4. Entregar | 5. Cobrar | 6. Medir',
    ejemplosPorRubro: [
      {
        rubro: 'Rutina Operativa',
        ejemplos: [
          'Comunicación: Crear y publicar 3 contenidos semanales orientados a ventas',
          'Ventas: Responder cotizaciones e itinerarios de clientes en menos de 24h',
          'Entrega: Realizar sesiones virtuales y enviar documentación de seguimiento',
          'Administración: Enviar links de pago, verificar transferencias y conciliar caja'
        ]
      }
    ],
    etiquetasSugeridas: ['comunicar', 'vender', 'entregar', 'cobrar', 'medir']
  },
  {
    stepIndex: 8,
    blockId: 'sociosClave',
    titulo: '8. Socios y aliados clave',
    preguntaCentral: '¿Qué personas, proveedores u organizaciones necesitás para que tu negocio funcione mejor?',
    preguntasGuiadas: [
      '¿Qué proveedor o fabricante es indispensable para operar?',
      '¿Qué tareas te conviene tercerizar (diseño, contabilidad, envíos)?',
      '¿Quiénes son aliados estratégicos para recomendarte o llegar a más clientes?',
      '¿Qué dependencia representa un riesgo si llega a fallar?'
    ],
    dinamicaNombre: 'Tipo de Relación Externa',
    dinamicaDescripcion: 'Clasificá en: Proveedor Crítico / Aliado Comercial / Profesional Externo / Canal de Distribución',
    ejemplosPorRubro: [
      {
        rubro: 'Ejemplos de Aliados',
        ejemplos: [
          'Proveedor de insumos o materias primas con entrega puntual',
          'Empresa de logística o servicio de mensajería rápida',
          'Contador externo para gestión tributaria',
          'Comunidad o profesional complementario con quien hacer alianzas cruzadas'
        ]
      }
    ],
    etiquetasSugeridas: ['proveedor', 'aliado', 'profesional-externo', 'distribuidor']
  },
  {
    stepIndex: 9,
    blockId: 'estructuraCostos',
    titulo: '9. Estructura de costos y egresos',
    preguntaCentral: '¿En qué gastás o vas a gastar para hacer funcionar este negocio?',
    preguntasGuiadas: [
      '¿Cuáles son tus costos fijos mensuales (alquiler, servicios, licencias, sueldos)?',
      '¿Cuáles son tus costos variables que cambian con cada venta (insumos, envíos)?',
      '¿Qué comisiones bancarias o impuestos tenés que pagar?',
      '¿Cuál es tu costo más elevado y cómo podrías optimizarlo?'
    ],
    dinamicaNombre: 'Fijo, Variable y Por Validar',
    dinamicaDescripcion: 'Etiquetá cada costo: Fijo mensual / Variable por venta / Inversión inicial / Comisión / Por validar',
    ejemplosPorRubro: [
      {
        rubro: 'Ejemplos de Egresos',
        ejemplos: [
          'Fijo: Licencia mensual de software, internet y telefonía',
          'Variable: Costo de materiales por unidad + envoltorio',
          'Comisión: Fee de pasarela de pago (3.5% + IVA) por transacción',
          'Inversión Inicial: Compra de herramientas básicas e identidad de marca'
        ]
      }
    ],
    etiquetasSugeridas: ['fijo', 'variable', 'inversion-inicial', 'comision', 'impuesto']
  }
];

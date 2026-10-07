import type { CanvasBlockId, BlockMetaInfo } from '../types/canvas';

export const CANVAS_BLOCKS: Record<CanvasBlockId, BlockMetaInfo> = {
  segmentosClientes: {
    id: 'segmentosClientes',
    tituloTecnico: 'Segmentos de Clientes',
    tituloEmprendedor: '1. ¿A quién querés ayudar y venderle?',
    preguntaCentral: '¿Quién tiene el problema que querés resolver y pagaría por tu solución?',
    descripcionCorta: 'Define el perfil de tus clientes ideales, sus características y sus necesidades principales.',
    icono: 'Users',
    colorBg: 'bg-indigo-50/50',
    colorBorder: 'border-indigo-200',
    colorBadge: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  propuestaValor: {
    id: 'propuestaValor',
    tituloTecnico: 'Propuesta de Valor',
    tituloEmprendedor: '2. ¿Qué resultado valioso ofrecés?',
    preguntaCentral: '¿Qué problema resolvés y por qué deberían elegirte a vos?',
    descripcionCorta: 'Explica la transformación o beneficio principal que recibe tu cliente.',
    icono: 'Sparkles',
    colorBg: 'bg-purple-50/50',
    colorBorder: 'border-purple-200',
    colorBadge: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  canales: {
    id: 'canales',
    tituloTecnico: 'Canales de Llegada y Venta',
    tituloEmprendedor: '3. ¿Cómo te descubren y compran?',
    preguntaCentral: '¿Por dónde te encuentran, consultan sus dudas y reciben el servicio?',
    descripcionCorta: 'Los medios que usas para darte a conocer, vender y entregar tu propuesta.',
    icono: 'Send',
    colorBg: 'bg-blue-50/50',
    colorBorder: 'border-blue-200',
    colorBadge: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  relacionesClientes: {
    id: 'relacionesClientes',
    tituloTecnico: 'Relaciones con Clientes',
    tituloEmprendedor: '4. ¿Cómo hacés que confíen y vuelvan?',
    preguntaCentral: '¿Cómo cuidás la relación para generar confianza y recomendaciones?',
    descripcionCorta: 'El tipo de trato y experiencia que brindás antes, durante y después de la venta.',
    icono: 'HeartHandshake',
    colorBg: 'bg-pink-50/50',
    colorBorder: 'border-pink-200',
    colorBadge: 'bg-pink-100 text-pink-800 border-pink-300'
  },
  fuentesIngresos: {
    id: 'fuentesIngresos',
    tituloTecnico: 'Fuentes de Ingresos',
    tituloEmprendedor: '5. ¿Cómo entra el dinero al negocio?',
    preguntaCentral: '¿Qué vendés concretamente y cómo te pagan?',
    descripcionCorta: 'Los productos, servicios y modelos de cobro que generan tus ingresos.',
    icono: 'CircleDollarSign',
    colorBg: 'bg-emerald-50/50',
    colorBorder: 'border-emerald-200',
    colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  recursosClave: {
    id: 'recursosClave',
    tituloTecnico: 'Recursos Clave',
    tituloEmprendedor: '6. ¿Qué necesitás tener o controlar?',
    preguntaCentral: '¿Qué herramientas, habilidades o equipamiento necesitás sí o sí?',
    descripcionCorta: 'Los activos físicos, intelectuales, humanos o financieros indispensables.',
    icono: 'KeyRound',
    colorBg: 'bg-amber-50/50',
    colorBorder: 'border-amber-200',
    colorBadge: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  actividadesClave: {
    id: 'actividadesClave',
    tituloTecnico: 'Actividades Clave',
    tituloEmprendedor: '7. ¿Qué tareas críticas ejecutás?',
    preguntaCentral: '¿Qué tenés que hacer semanalmente para atraer, vender y entregar?',
    descripcionCorta: 'Las acciones fundamentales que debes realizar día a día para que el negocio opere.',
    icono: 'CheckSquare',
    colorBg: 'bg-teal-50/50',
    colorBorder: 'border-teal-200',
    colorBadge: 'bg-teal-100 text-teal-800 border-teal-300'
  },
  sociosClave: {
    id: 'sociosClave',
    tituloTecnico: 'Socios y Aliados Clave',
    tituloEmprendedor: '8. ¿Quiénes te ayudan a operar mejor?',
    preguntaCentral: '¿En quiénes te apoyás para tercerizar o potenciar tus ventas?',
    descripcionCorta: 'Proveedores, aliados o profesionales externos que apoyan tu negocio.',
    icono: 'UsersRound',
    colorBg: 'bg-cyan-50/50',
    colorBorder: 'border-cyan-200',
    colorBadge: 'bg-cyan-100 text-cyan-800 border-cyan-300'
  },
  estructuraCostos: {
    id: 'estructuraCostos',
    tituloTecnico: 'Estructura de Costos',
    tituloEmprendedor: '9. ¿En qué gastás para operar?',
    preguntaCentral: '¿Cuáles son los costos más importantes para mantener funcionando la actividad?',
    descripcionCorta: 'Los principales egresos fijos, variables y comisiones de tu negocio.',
    icono: 'Receipt',
    colorBg: 'bg-rose-50/50',
    colorBorder: 'border-rose-200',
    colorBadge: 'bg-rose-100 text-rose-800 border-rose-300'
  }
};

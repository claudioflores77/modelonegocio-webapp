import { BlockMetaInfo, CanvasBlockId } from '../types/canvas';

export const CANVAS_BLOCKS: Record<CanvasBlockId, BlockMetaInfo> = {
  segmentosClientes: {
    id: 'segmentosClientes',
    tituloTecnico: 'Segmentos de Clientes',
    tituloEmprendedor: '¿Para quién estás creando esto?',
    preguntaCentral: '¿Quién tiene el problema que querés resolver y estaría dispuesto a pagar por una solución?',
    descripcionCorta: 'Identificá a quién servís. Evitá "todo el mundo" y definí tu cliente prioritario.',
    icono: 'Users',
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-300',
    colorBadge: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  propuestaValor: {
    id: 'propuestaValor',
    tituloTecnico: 'Propuesta de Valor',
    tituloEmprendedor: '¿Qué problema resolvés y por qué te elegirían?',
    preguntaCentral: '¿Qué resultado valioso logra tu cliente gracias a vos?',
    descripcionCorta: 'El beneficio y transformación que entregás, no solo las características de tu producto.',
    icono: 'Sparkles',
    colorBg: 'bg-indigo-50',
    colorBorder: 'border-indigo-300',
    colorBadge: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  canales: {
    id: 'canales',
    tituloTecnico: 'Canales',
    tituloEmprendedor: '¿Cómo te encuentran, compran y reciben lo que ofrecés?',
    preguntaCentral: '¿Cómo va a encontrarte, confiar en vos, comprarte y recibir lo que ofrecés?',
    descripcionCorta: 'Medios de comunicación, venta y entrega (online y presencial).',
    icono: 'Send',
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-300',
    colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  relacionesClientes: {
    id: 'relacionesClientes',
    tituloTecnico: 'Relaciones con Clientes',
    tituloEmprendedor: '¿Cómo atraés, atendés y hacés que vuelvan?',
    preguntaCentral: '¿Qué experiencia querés que tenga tu cliente antes, durante y después de comprar?',
    descripcionCorta: 'Atención, seguimiento, comunidad, fidelización y generación de confianza.',
    icono: 'HeartHandshake',
    colorBg: 'bg-rose-50',
    colorBorder: 'border-rose-300',
    colorBadge: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  fuentesIngresos: {
    id: 'fuentesIngresos',
    tituloTecnico: 'Fuentes de Ingresos',
    tituloEmprendedor: '¿De dónde entra el dinero?',
    preguntaCentral: '¿Por qué te van a pagar y de qué forma entra el dinero al negocio?',
    descripcionCorta: 'Precios, forma de cobro, suscripciones, servicios, comisión o venta directa.',
    icono: 'CircleDollarSign',
    colorBg: 'bg-teal-50',
    colorBorder: 'border-teal-300',
    colorBadge: 'bg-teal-100 text-teal-800 border-teal-300'
  },
  recursosClave: {
    id: 'recursosClave',
    tituloTecnico: 'Recursos Clave',
    tituloEmprendedor: '¿Qué necesitás tener para funcionar?',
    preguntaCentral: '¿Qué necesitás tener o controlar para poder cumplir tu promesa al cliente?',
    descripcionCorta: 'Personas, herramientas, tecnología, capital, local, permisos y conocimientos.',
    icono: 'KeyRound',
    colorBg: 'bg-sky-50',
    colorBorder: 'border-sky-300',
    colorBadge: 'bg-sky-100 text-sky-800 border-sky-300'
  },
  actividadesClave: {
    id: 'actividadesClave',
    tituloTecnico: 'Actividades Clave',
    tituloEmprendedor: '¿Qué tenés que hacer muy bien y de forma constante?',
    preguntaCentral: '¿Qué tareas tenés que ejecutar bien para entregar valor y cobrar por ello?',
    descripcionCorta: 'Acciones diarias y semanales: crear, comunicar, vender, entregar, cobrar.',
    icono: 'CheckSquare',
    colorBg: 'bg-purple-50',
    colorBorder: 'border-purple-300',
    colorBadge: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  sociosClave: {
    id: 'sociosClave',
    tituloTecnico: 'Socios Clave',
    tituloEmprendedor: '¿Quiénes te ayudan a que funcione?',
    preguntaCentral: '¿Qué personas, proveedores u organizaciones necesitás para que tu negocio funcione mejor?',
    descripcionCorta: 'Proveedores críticos, alianzas de distribución, profesionales externos.',
    icono: 'UsersRound',
    colorBg: 'bg-orange-50',
    colorBorder: 'border-orange-300',
    colorBadge: 'bg-orange-100 text-orange-800 border-orange-300'
  },
  estructuraCostos: {
    id: 'estructuraCostos',
    tituloTecnico: 'Estructura de Costos',
    tituloEmprendedor: '¿En qué se te va el dinero?',
    preguntaCentral: '¿En qué gastás o vas a gastar para hacer funcionar este negocio?',
    descripcionCorta: 'Costos fijos, variables, inversión inicial, comisiones e impuestos.',
    icono: 'Receipt',
    colorBg: 'bg-slate-100',
    colorBorder: 'border-slate-300',
    colorBadge: 'bg-slate-200 text-slate-800 border-slate-300'
  }
};
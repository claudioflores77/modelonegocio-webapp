import type { CanvasProject } from '../types/canvas';

export interface CoherenceAlert {
  id: string;
  tipo: 'warning' | 'danger' | 'info' | 'success';
  titulo: string;
  mensaje: string;
  bloqueRelacionado?: string;
}

export function evaluateCoherence(project: CanvasProject): CoherenceAlert[] {
  const alerts: CoherenceAlert[] = [];
  const getNotes = (blockId: string) => project.notas.filter(n => n.bloque === blockId);

  const clientes = getNotes('segmentosClientes');
  const propuesta = getNotes('propuestaValor');
  const canales = getNotes('canales');
  const ingresos = getNotes('fuentesIngresos');
  const actividades = getNotes('actividadesClave');
  const costos = getNotes('estructuraCostos');

  // 1. Clientes pero no propuesta
  if (clientes.length > 0 && propuesta.length === 0) {
    alerts.push({
      id: 'clientes_sin_propuesta',
      tipo: 'warning',
      titulo: 'Falta definir la Propuesta de Valor',
      mensaje: 'Definiste a quién querés venderle, pero falta explicar qué resultado valioso recibe.',
      bloqueRelacionado: 'propuestaValor'
    });
  }

  // 2. Propuesta pero no canales
  if (propuesta.length > 0 && canales.length === 0) {
    alerts.push({
      id: 'propuesta_sin_canales',
      tipo: 'warning',
      titulo: 'Sin Canales de Llegada o Venta',
      mensaje: 'Tu solución puede ser valiosa, pero todavía no está claro cómo te descubrirán y comprarán.',
      bloqueRelacionado: 'canales'
    });
  }

  // 3. Costos pero no ingresos
  if (costos.length > 0 && ingresos.length === 0) {
    alerts.push({
      id: 'costos_sin_ingresos',
      tipo: 'danger',
      titulo: 'Egresos sin Fuentes de Ingreso',
      mensaje: 'Registraste gastos, pero falta definir qué vas a vender y cómo vas a cobrar.',
      bloqueRelacionado: 'fuentesIngresos'
    });
  }

  // 4. Ingresos pero no actividades
  if (ingresos.length > 0 && actividades.length === 0) {
    alerts.push({
      id: 'ingresos_sin_actividades',
      tipo: 'warning',
      titulo: 'Ingresos sin Operación Asociada',
      mensaje: 'Definiste qué cobrar, pero falta describir cómo vas a fabricar o entregar esa promesa.',
      bloqueRelacionado: 'actividadesClave'
    });
  }

  // 5. Cliente "todos"
  const clienteGenerico = clientes.some(c => 
    c.texto.toLowerCase().includes('todos') || 
    c.texto.toLowerCase().includes('cualquiera') || 
    c.texto.toLowerCase().includes('todo el mundo')
  );
  if (clienteGenerico) {
    alerts.push({
      id: 'cliente_todos',
      tipo: 'warning',
      titulo: 'Segmento de Cliente demasiado amplio',
      mensaje: 'Tu público parece muy general. Elegí un primer grupo más concreto para comunicar con claridad.',
      bloqueRelacionado: 'segmentosClientes'
    });
  }

  // 6. Demasiados supuestos en amarillo sin validar
  const supuestos = project.notas.filter(n => n.estado === 'amarillo');
  if (supuestos.length >= 4) {
    alerts.push({
      id: 'muchas_hipotesis',
      tipo: 'info',
      titulo: `${supuestos.length} Hipótesis por comprobar (Semáforo Amarillo)`,
      mensaje: 'Tu modelo tiene buenas hipótesis. El siguiente paso es priorizar cuáles validar primero con experimentos.',
    });
  }

  // 7. Sin costos variables
  const costosVariables = costos.some(c => 
    c.etiquetas?.includes('variable') || 
    c.texto.toLowerCase().includes('variable') ||
    c.texto.toLowerCase().includes('envio') ||
    c.texto.toLowerCase().includes('comision')
  );
  if (costos.length > 0 && !costosVariables) {
    alerts.push({
      id: 'sin_costos_variables',
      tipo: 'info',
      titulo: 'Revisá Costos Variables y Comisiones',
      mensaje: 'Revisá si existen insumos, comisiones de cobro, envíos o impuestos asociados a cada venta.',
      bloqueRelacionado: 'estructuraCostos'
    });
  }

  // 8. Canvas muy completo
  const totalNotas = project.notas.length;
  if (totalNotas >= 9 && alerts.filter(a => a.tipo === 'danger').length === 0) {
    alerts.push({
      id: 'canvas_solido',
      tipo: 'success',
      titulo: '¡Excelente avance!',
      mensaje: 'Completaste los bloques principales del Canvas. Estás listo para probar tus hipótesis en la realidad.'
    });
  }

  return alerts;
}

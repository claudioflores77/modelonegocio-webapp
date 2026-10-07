import type { CanvasProject } from '../types/canvas';

const STORAGE_KEY = 'canvas_projects_data_v1';
const ACTIVE_PROJECT_KEY = 'canvas_active_project_id_v1';

export const DEMO_PROJECTS: CanvasProject[] = [
  {
    id: 'demo-mentora',
    nombreProyecto: 'Mentoría de Negocios Digitales',
    descripcionBreve: 'Asesoría y estructuración de ofertas para emprendedoras de servicios.',
    tipoProyecto: 'negocio_existente',
    sector: 'Servicios Profesionales',
    etapa: 'operando',
    objetivo: 'vender_mejor',
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString(),
    notas: [
      {
        id: 'n1',
        bloque: 'segmentosClientes',
        texto: 'Emprendedoras de servicios (28 a 45 años) que venden por Instagram y no logran ventas constantes',
        estado: 'verde',
        etiquetas: ['cliente-prioritario'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n2',
        bloque: 'propuestaValor',
        texto: 'Acompañamiento práctico para diseñar una oferta clara y un plan comercial en 30 días sin complicaciones',
        estado: 'verde',
        etiquetas: ['beneficio-clave'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n3',
        bloque: 'canales',
        texto: 'Contenido educativo en Reels de Instagram + Recomendaciones boca a boca',
        estado: 'verde',
        etiquetas: ['descubrimiento'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n4',
        bloque: 'canales',
        texto: 'Consultas y cierres por WhatsApp Business con link de pago Mercado Pago',
        estado: 'verde',
        etiquetas: ['venta'],
        orden: 2,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n5',
        bloque: 'relacionesClientes',
        texto: 'Respuesta rápida en menos de 1 hora + Seguimiento personalizado pos-mentoría a los 15 días',
        estado: 'amarillo',
        etiquetas: ['atencion-personalizada'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n6',
        bloque: 'fuentesIngresos',
        texto: 'Oferta Principal: Programa intensivo de mentoría 1 a 1',
        estado: 'verde',
        etiquetas: ['oferta-principal'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n7',
        bloque: 'fuentesIngresos',
        texto: 'Oferta de Entrada: Auditoría express de perfil e historias',
        estado: 'amarillo',
        etiquetas: ['pago-unico'],
        orden: 2,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n8',
        bloque: 'recursosClave',
        texto: 'Conocimientos de estrategia comercial, Zoom, Notion y celular con buena cámara',
        estado: 'verde',
        etiquetas: ['ya-tengo'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n9',
        bloque: 'actividadesClave',
        texto: 'Publicar 3 contenidos semanales orientados a dolor del cliente y responder consultas',
        estado: 'verde',
        etiquetas: ['comunicar', 'vender'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n10',
        bloque: 'sociosClave',
        texto: 'Diseñadora gráfica externa para plantillas visuales + Contador para facturación',
        estado: 'amarillo',
        etiquetas: ['profesional-externo'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n11',
        bloque: 'estructuraCostos',
        texto: 'Costos fijos: Licencia de Zoom Pro, Canva Pro e internet (/mes)',
        estado: 'verde',
        etiquetas: ['fijo'],
        orden: 1,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      },
      {
        id: 'n12',
        bloque: 'estructuraCostos',
        texto: 'Comisiones cobro online (3.5% a 6% por venta realizada)',
        estado: 'verde',
        etiquetas: ['comision'],
        orden: 2,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      }
    ],
    planAccion: {
      hipotesisCritica: 'Las emprendedoras comprarán la auditoría express como paso previo a la mentoría',
      accionSemanal: 'Ofrecer 10 cupos promocionales por historias de Instagram y WhatsApp',
      fechaRevision: 'Próximo viernes',
      indicadorSimple: 'Conseguir al menos 4 compras o reservas abonadas'
    }
  }
];

export function getStoredProjects(): CanvasProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_PROJECTS));
      return DEMO_PROJECTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error cargando proyectos locales:', e);
    return DEMO_PROJECTS;
  }
}

export function saveProjects(projects: CanvasProject[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error guardando proyectos en localStorage:', e);
  }
}

export function getActiveProjectId(): string | null {
  return localStorage.getItem(ACTIVE_PROJECT_KEY);
}

export function setActiveProjectId(id: string): void {
  localStorage.setItem(ACTIVE_PROJECT_KEY, id);
}

export function saveProject(project: CanvasProject): CanvasProject[] {
  const projects = getStoredProjects();
  const index = projects.findIndex(p => p.id === project.id);
  
  const updatedProject = {
    ...project,
    fechaActualizacion: new Date().toISOString()
  };

  let newProjects: CanvasProject[];
  if (index >= 0) {
    newProjects = [...projects];
    newProjects[index] = updatedProject;
  } else {
    newProjects = [updatedProject, ...projects];
  }

  saveProjects(newProjects);
  setActiveProjectId(updatedProject.id);
  return newProjects;
}

export function deleteProject(id: string): CanvasProject[] {
  const projects = getStoredProjects().filter(p => p.id !== id);
  saveProjects(projects);
  if (getActiveProjectId() === id) {
    const nextId = projects.length > 0 ? projects[0].id : '';
    if (nextId) setActiveProjectId(nextId);
    else localStorage.removeItem(ACTIVE_PROJECT_KEY);
  }
  return projects;
}

export function duplicateProject(id: string): CanvasProject[] {
  const projects = getStoredProjects();
  const target = projects.find(p => p.id === id);
  if (!target) return projects;

  const newId = 'proj-' + Date.now();
  const copy: CanvasProject = {
    ...target,
    id: newId,
    nombreProyecto: `${target.nombreProyecto} (Copia)`,
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString(),
    notas: target.notas.map(n => ({
      ...n,
      id: 'note-' + Math.random().toString(36).substr(2, 9)
    }))
  };

  const newProjects = [copy, ...projects];
  saveProjects(newProjects);
  setActiveProjectId(newId);
  return newProjects;
}

export function exportBackupJSON(projects: CanvasProject[]): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "respaldo_canvas.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

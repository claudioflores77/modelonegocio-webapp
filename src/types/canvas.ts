export type CanvasBlockId = 
  | 'segmentosClientes'
  | 'propuestaValor'
  | 'canales'
  | 'relacionesClientes'
  | 'fuentesIngresos'
  | 'recursosClave'
  | 'actividadesClave'
  | 'sociosClave'
  | 'estructuraCostos';

export type CertaintyLevel = 'verde' | 'amarillo' | 'rojo'; // verde=validado, amarillo=hipotesis, rojo=pendiente

export type ProjectType = 'idea' | 'negocio_existente' | 'modificacion';

export type StageType = 'idea' | 'inicio' | 'operando' | 'optimizacion';

export type GoalType = 
  | 'ordenar_idea' 
  | 'conseguir_clientes' 
  | 'vender_mejor' 
  | 'lanzar_nuevo' 
  | 'reducir_costos' 
  | 'presentar_negocio' 
  | 'buscar_aliados';

export interface CanvasNote {
  id: string;
  texto: string;
  bloque: CanvasBlockId;
  estado: CertaintyLevel;
  prioridad?: 'alta' | 'media' | 'baja';
  etiquetas?: string[];
  orden: number;
  fechaCreacion: string;
  fechaActualizacion: string;
  experimento?: {
    queComprobar: string;
    conQuien: string;
    como: string;
    senalExito: string;
    paraCuando: string;
  };
}

export interface CanvasProject {
  id: string;
  nombreProyecto: string;
  descripcionBreve: string;
  tipoProyecto: ProjectType;
  sector: string;
  etapa: StageType;
  objetivo: GoalType;
  fechaCreacion: string;
  fechaActualizacion: string;
  notas: CanvasNote[];
  planAccion?: {
    hipotesisCritica: string;
    accionSemanal: string;
    fechaRevision: string;
    indicadorSimple: string;
  };
}

export interface BlockMetaInfo {
  id: CanvasBlockId;
  tituloTecnico: string;
  tituloEmprendedor: string;
  preguntaCentral: string;
  descripcionCorta: string;
  icono: string;
  colorBg: string;
  colorBorder: string;
  colorBadge: string;
}
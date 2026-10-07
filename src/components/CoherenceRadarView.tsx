import React, { useState } from 'react';
import type { CanvasProject, CanvasNote } from '../types/canvas';
import { evaluateCoherence } from '../utils/coherenceRadar';
import {
  Radar,
  FlaskConical,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Target,
  Sparkles
} from 'lucide-react';

interface CoherenceRadarProps {
  project: CanvasProject;
  onUpdateProject: (updated: CanvasProject) => void;
  onOpenExperimentModal: (note: CanvasNote) => void;
}

export const CoherenceRadarView: React.FC<CoherenceRadarProps> = ({
  project,
  onUpdateProject,
  onOpenExperimentModal
}) => {
  const alerts = evaluateCoherence(project);
  const hypothesisNotes = project.notas.filter(n => n.estado === 'amarillo' || n.estado === 'rojo');
  const [planAccion, setPlanAccion] = useState(project.planAccion || {
    hipotesisCritica: '',
    accionSemanal: '',
    fechaRevision: '',
    indicadorSimple: ''
  });

  const handlePlanChange = (field: string, val: string) => {
    const updatedPlan = { ...planAccion, [field]: val };
    setPlanAccion(updatedPlan);
    onUpdateProject({
      ...project,
      planAccion: updatedPlan
    });
  };

  const getAlertStyle = (tipo: string) => {
    switch (tipo) {
      case 'danger':
        return 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200';
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200';
      case 'info':
      default:
        return 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Radar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Radar de Coherencia y Experimentos de Validación
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Analizá inconsistencias en tu modelo y gestioná los experimentos para validar tus hipótesis críticas.
          </p>
        </div>
      </div>

      {/* Alerts section */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          Alertas de Coherencia ({alerts.length})
        </h2>

        {alerts.length === 0 ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ¡No se detectaron alertas inconsistentes en tu modelo!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map(a => (
              <div key={a.id} className={`p-4 rounded-xl border ${getAlertStyle(a.tipo)} space-y-1`}>
                <h3 className="font-bold text-xs flex items-center gap-2">
                  {a.tipo === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                  {a.tipo === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                  {a.tipo === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  {a.tipo === 'info' && <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  {a.titulo}
                </h3>
                <p className="text-xs opacity-90">{a.mensaje}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hypothesis & Experiments */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Hipótesis por Validar ({hypothesisNotes.length})
        </h2>

        {hypothesisNotes.length === 0 ? (
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-1">
            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Todas tus tarjetas están validadas (Semáforo Verde).</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Si agregás nuevas hipótesis o dudas en el Canvas o Asistente, aparecerán aquí para convertirlas en experimentos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hypothesisNotes.map(n => (
              <div key={n.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      n.estado === 'amarillo'
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                    }`}>
                      {n.estado === 'amarillo' ? 'Hipótesis' : 'Pendiente'}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                      {n.bloque}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{n.texto}</p>

                  {n.experimento && (
                    <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60 rounded-lg text-[11px] space-y-1 text-purple-900 dark:text-purple-200">
                      <p><strong>Experimento:</strong> {n.experimento.como}</p>
                      <p><strong>Con quién:</strong> {n.experimento.conQuien}</p>
                      <p><strong>Éxito:</strong> {n.experimento.senalExito}</p>
                      <p><strong>Fecha:</strong> {n.experimento.paraCuando}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onOpenExperimentModal(n)}
                  className="w-full py-1.5 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-lg border border-purple-200 dark:border-purple-800 transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  {n.experimento ? 'Editar experimento' : 'Diseñar experimento'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Plan */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Plan de Acción Semanal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Hipótesis más crítica esta semana:</label>
            <input
              type="text"
              value={planAccion.hipotesisCritica}
              onChange={e => handlePlanChange('hipotesisCritica', e.target.value)}
              placeholder="Ej: Las emprendedoras aceptarán comprar la auditoría express..."
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus-visible:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Acción concreta a realizar:</label>
            <input
              type="text"
              value={planAccion.accionSemanal}
              onChange={e => handlePlanChange('accionSemanal', e.target.value)}
              placeholder="Ej: Ofrecer 10 cupos promocionales por historias de Instagram..."
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus-visible:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Indicador o métrica simple:</label>
            <input
              type="text"
              value={planAccion.indicadorSimple}
              onChange={e => handlePlanChange('indicadorSimple', e.target.value)}
              placeholder="Ej: Conseguir al menos 4 ventas abonadas..."
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus-visible:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Fecha de revisión:</label>
            <input
              type="text"
              value={planAccion.fechaRevision}
              onChange={e => handlePlanChange('fechaRevision', e.target.value)}
              placeholder="Ej: Próximo viernes..."
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus-visible:outline-hidden"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

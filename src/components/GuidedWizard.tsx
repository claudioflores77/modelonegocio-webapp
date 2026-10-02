import React, { useState } from 'react';
import { 
  WIZARD_STEPS, 
  WizardStepData 
} from '../data/wizardSteps';
import { CANVAS_BLOCKS } from '../data/canvasBlocks';
import { CanvasProject, CanvasNote, CertaintyLevel, CanvasBlockId } from '../types/canvas';
import { NoteCard } from './NoteCard';
import { 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  FlaskConical,
  Compass,
  ArrowRight
} from 'lucide-react';

interface GuidedWizardProps {
  project: CanvasProject;
  onUpdateProject: (updated: CanvasProject) => void;
  onFinishWizard: () => void;
  onOpenExperimentModal: (note: CanvasNote) => void;
}

export const GuidedWizard: React.FC<GuidedWizardProps> = ({
  project,
  onUpdateProject,
  onFinishWizard,
  onOpenExperimentModal
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedCertainty, setSelectedCertainty] = useState<CertaintyLevel>('verde');
  const [showExamplesModal, setShowExamplesModal] = useState(false);
  const [showWhyItMatters, setShowWhyItMatters] = useState(false);

  const step: WizardStepData = WIZARD_STEPS[currentStepIndex];
  const blockMeta = CANVAS_BLOCKS[step.blockId];

  const currentBlockNotes = project.notas.filter(n => n.bloque === step.blockId);
  const progressPercent = Math.round(((currentStepIndex + 1) / WIZARD_STEPS.length) * 100);

  const handleAddNote = (textOverride?: string, statusOverride?: CertaintyLevel) => {
    const textToAdd = textOverride || newNoteText;
    if (!textToAdd.trim()) return;

    const newNote: CanvasNote = {
      id: 'note-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      bloque: step.blockId,
      texto: textToAdd.trim(),
      estado: statusOverride || selectedCertainty,
      orden: currentBlockNotes.length + 1,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString()
    };

    onUpdateProject({
      ...project,
      notas: [...project.notas, newNote]
    });

    setNewNoteText('');
  };

  const handleUpdateNote = (updatedNote: CanvasNote) => {
    const updatedNotas = project.notas.map(n => n.id === updatedNote.id ? updatedNote : n);
    onUpdateProject({ ...project, notas: updatedNotas });
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotas = project.notas.filter(n => n.id !== id);
    onUpdateProject({ ...project, notas: updatedNotas });
  };

  const handleNoLoSeTodavia = () => {
    handleAddNote(Pendiente por definir: , 'rojo');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Progress Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Paso {currentStepIndex + 1} de {WIZARD_STEPS.length}: {blockMeta.tituloTecnico}
              </h2>
              <p className="text-xs text-slate-500">
                {blockMeta.tituloEmprendedor}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            {progressPercent}% completado
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-violet-600 h-full transition-all duration-300" 
            style={{ width: ${progressPercent}% }}
          />
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-between mt-3 px-1 overflow-x-auto gap-1">
          {WIZARD_STEPS.map((s, idx) => {
            const hasNotes = project.notas.some(n => n.bloque === s.blockId);
            const isCurrent = idx === currentStepIndex;
            return (
              <button
                key={s.stepIndex}
                onClick={() => setCurrentStepIndex(idx)}
                className={lex-1 min-w-[24px] h-2 rounded-full transition-all }
                title={Paso : }
              />
            );
          })}
        </div>
      </div>

      {/* Main Grid: Wizard Form Left, Canvas Block Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Guided Questions & Input */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            
            {/* Title & Central Question */}
            <div>
              <span className={inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold  mb-3}>
                {step.titulo}
              </span>
              <h1 className="text-xl font-bold text-slate-900 leading-snug">
                {step.preguntaCentral}
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                {blockMeta.descripcionCorta}
              </p>
            </div>

            {/* Guided Secondary Questions */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Preguntas orientadoras
                </span>
                <button
                  onClick={() => setShowWhyItMatters(!showWhyItMatters)}
                  className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  ¿Por qué importa esto?
                </button>
              </div>

              {showWhyItMatters && (
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-900 mb-2 leading-relaxed">
                  <strong>Propósito clave:</strong> {step.preguntaCentral} Cada bloque sostiene tu modelo de negocios. Si este bloque falla o queda difuso, todo el negocio tambalea.
                </div>
              )}

              <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside pl-1">
                {step.preguntasGuiadas.map((q, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dinámica sugerida */}
            <div className="p-3.5 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-violet-900">
                    Dinámica rápida: {step.dinamicaNombre}
                  </h4>
                  <p className="text-xs text-violet-800 mt-0.5">
                    {step.dinamicaDescripcion}
                  </p>
                </div>
              </div>
            </div>

            {/* UX Alert if any */}
            {step.alertaUX && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{step.alertaUX}</span>
              </div>
            )}

            {/* Form Input for New Note */}
            <div className="pt-2 space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Escribí una idea corta o nota para este bloque:
              </label>

              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Ejemplo: Emprendedoras que buscan vender sus servicios por redes sociales..."
                className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                rows={3}
              />

              {/* Certainty level selector */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-600">Estado de certeza:</span>
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSelectedCertainty('verde')}
                      className={px-2.5 py-1 rounded-md text-xs font-medium transition-all }
                    >
                      ✓ Validado
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCertainty('amarillo')}
                      className={px-2.5 py-1 rounded-md text-xs font-medium transition-all }
                    >
                      ! Hipótesis
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCertainty('rojo')}
                      className={px-2.5 py-1 rounded-md text-xs font-medium transition-all }
                    >
                      ? Pendiente
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowExamplesModal(true)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    Ver ejemplos por rubro
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddNote()}
                    disabled={!newNoteText.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar como nota
                  </button>
                </div>
              </div>

              {/* Alternative button: No lo sé todavía */}
              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={handleNoLoSeTodavia}
                  className="text-xs text-slate-500 hover:text-slate-700 hover:underline inline-flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  No lo sé todavía (Marcar como pendiente)
                </button>
              </div>

            </div>

          </div>

          {/* Wizard Navigation Footer */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-slate-700 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior paso
            </button>

            {currentStepIndex < WIZARD_STEPS.length - 1 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
              >
                Siguiente paso
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onFinishWizard}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                ¡Ver Canvas Visual Completo!
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Added Notes Preview for this Block */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className={p-5 rounded-2xl border   min-h-[420px]}>
            <div className="flex items-center justify-between mb-4 border-b pb-3 border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">
                  Notas agregadas en este bloque
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200">
                  {currentBlockNotes.length}
                </span>
              </div>
            </div>

            {currentBlockNotes.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-12 h-12 bg-white text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-2xs border border-slate-200">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Aún no agregaste notas para <strong>{blockMeta.tituloTecnico}</strong>.
                </p>
                <p className="text-[11px] text-slate-500">
                  Respondé la pregunta de la izquierda y presioná "Agregar como nota" para ver tus tarjetas aquí.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {currentBlockNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onUpdateNote={handleUpdateNote}
                    onDeleteNote={handleDeleteNote}
                    onOpenExperimentModal={onOpenExperimentModal}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Rubro Examples Modal */}
      {showExamplesModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  Ejemplos por rubro para {blockMeta.tituloTecnico}
                </h3>
                <p className="text-xs text-slate-500">
                  Inspirate con estos ejemplos y agregalos con un solo clic a tu Canvas.
                </p>
              </div>
              <button
                onClick={() => setShowExamplesModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {step.ejemplosPorRubro.map((rubroData, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                    {rubroData.rubro}
                  </h4>
                  <div className="space-y-2">
                    {rubroData.ejemplos.map((ej, eIdx) => (
                      <div 
                        key={eIdx}
                        className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-3 hover:border-indigo-300 transition-colors"
                      >
                        <p className="text-xs text-slate-800">
                          {ej}
                        </p>
                        <button
                          onClick={() => {
                            handleAddNote(ej, 'verde');
                            setShowExamplesModal(false);
                          }}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center gap-1 flex-shrink-0"
                        >
                          Usar este ejemplo
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowExamplesModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
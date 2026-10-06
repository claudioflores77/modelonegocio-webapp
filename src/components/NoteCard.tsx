import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  FlaskConical, 
  Tag, 
  Check, 
  MoveRight
} from 'lucide-react';
import type { CanvasNote, CertaintyLevel, CanvasBlockId } from '../types/canvas';
import { CANVAS_BLOCKS } from '../data/canvasBlocks';

interface NoteCardProps {
  note: CanvasNote;
  onUpdateNote: (note: CanvasNote) => void;
  onDeleteNote: (id: string) => void;
  onMoveNote?: (id: string, direction: 'up' | 'down') => void;
  onMoveToBlock?: (id: string, targetBlock: CanvasBlockId) => void;
  onOpenExperimentModal?: (note: CanvasNote) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onUpdateNote,
  onDeleteNote,
  onMoveNote,
  onMoveToBlock,
  onOpenExperimentModal
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.texto);
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  const handleSaveText = () => {
    if (!editText.trim()) return;
    onUpdateNote({
      ...note,
      texto: editText.trim(),
      fechaActualizacion: new Date().toISOString()
    });
    setIsEditing(false);
  };

  const handleCertaintyChange = (estado: CertaintyLevel) => {
    onUpdateNote({
      ...note,
      estado,
      fechaActualizacion: new Date().toISOString()
    });
  };

  const getCertaintyBadge = () => {
    switch (note.estado) {
      case 'verde':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            Validado
          </span>
        );
      case 'amarillo':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            Hipótesis
          </span>
        );
      case 'rojo':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
            <HelpCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
            Pendiente
          </span>
        );
    }
  };

  const getNoteBorderBg = () => {
    switch (note.estado) {
      case 'verde':
        return 'bg-white dark:bg-slate-900 border-l-4 border-l-emerald-500 border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xs';
      case 'amarillo':
        return 'bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-l-amber-400 border-amber-200 dark:border-amber-900/50 shadow-2xs hover:shadow-xs';
      case 'rojo':
      default:
        return 'bg-rose-50/60 dark:bg-rose-950/20 border-l-4 border-l-rose-400 border-rose-200 dark:border-rose-900/50 shadow-2xs hover:shadow-xs';
    }
  };

  return (
    <div className={`p-3 rounded-xl border transition-all relative group ${getNoteBorderBg()}`}>
      
      {/* Top Header: Badge + Actions */}
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {getCertaintyBadge()}
          {note.experimento && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <FlaskConical className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              Experimento
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          {onMoveNote && (
            <>
              <button
                onClick={() => onMoveNote(note.id, 'up')}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded focus-visible:outline-hidden"
                title="Mover arriba"
                aria-label="Mover arriba"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onMoveNote(note.id, 'down')}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded focus-visible:outline-hidden"
                title="Mover abajo"
                aria-label="Mover abajo"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {onMoveToBlock && (
            <div className="relative">
              <button
                onClick={() => setShowMoveMenu(!showMoveMenu)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded focus-visible:outline-hidden"
                title="Mover a otro bloque"
                aria-label="Mover a otro bloque"
              >
                <MoveRight className="w-3.5 h-3.5" />
              </button>
              {showMoveMenu && (
                <div className="absolute right-0 top-6 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50 p-1 text-xs">
                  <div className="px-2 py-1 font-semibold text-slate-400 dark:text-slate-500 text-[10px] uppercase">
                    Mover nota a...
                  </div>
                  {Object.values(CANVAS_BLOCKS).map(b => (
                    <button
                      key={b.id}
                      onClick={() => {
                        onMoveToBlock(note.id, b.id);
                        setShowMoveMenu(false);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 rounded text-xs truncate"
                    >
                      {b.tituloTecnico}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded focus-visible:outline-hidden"
            title="Editar texto"
            aria-label="Editar texto"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => onDeleteNote(note.id)}
            className="p-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded focus-visible:outline-hidden"
            title="Eliminar nota"
            aria-label="Eliminar nota"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="space-y-2 my-1">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 text-xs border border-indigo-300 dark:border-indigo-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            rows={3}
            autoFocus
          />
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveText}
              className="px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium flex items-center gap-1 shadow-2xs"
            >
              <Check className="w-3 h-3" />
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
          {note.texto}
        </p>
      )}

      {/* Tags & Certainty Controls */}
      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 flex-wrap text-[11px]">
        {/* Certainty level quick selectors */}
        <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-0.5 rounded-md">
          <button
            onClick={() => handleCertaintyChange('verde')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              note.estado === 'verde'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400'
            }`}
            title="Marcado como datos comprobados o experiencia"
          >
            Validado
          </button>
          <button
            onClick={() => handleCertaintyChange('amarillo')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              note.estado === 'amarillo'
                ? 'bg-amber-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-400'
            }`}
            title="Hipótesis por comprobar"
          >
            Hipótesis
          </button>
          <button
            onClick={() => handleCertaintyChange('rojo')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              note.estado === 'rojo'
                ? 'bg-rose-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-400'
            }`}
            title="Respuesta pendiente"
          >
            Pendiente
          </button>
        </div>

        {/* Experiment button if yellow/red */}
        {note.estado !== 'verde' && onOpenExperimentModal && (
          <button
            onClick={() => onOpenExperimentModal(note)}
            className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800 flex items-center gap-1 transition-colors"
          >
            <FlaskConical className="w-3 h-3" />
            {note.experimento ? 'Ver experimento' : 'Convertir en experimento'}
          </button>
        )}
      </div>

      {/* Tags list if any */}
      {note.etiquetas && note.etiquetas.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {note.etiquetas.map((t, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px]">
              <Tag className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500" />
              {t}
            </span>
          ))}
        </div>
      )}

    </div>
  );
};

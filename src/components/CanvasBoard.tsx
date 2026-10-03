import React, { useState } from 'react';
import type { CanvasProject, CanvasNote, CanvasBlockId, CertaintyLevel } from '../types/canvas';
import { CANVAS_BLOCKS } from '../data/canvasBlocks';
import { NoteCard } from './NoteCard';
import {
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Compass
} from 'lucide-react';

interface CanvasBoardProps {
  project: CanvasProject;
  onUpdateProject: (updated: CanvasProject) => void;
  onOpenWizard: () => void;
  onOpenExperimentModal: (note: CanvasNote) => void;
}

export const CanvasBoard: React.FC<CanvasBoardProps> = ({
  project,
  onUpdateProject,
  onOpenWizard,
  onOpenExperimentModal
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [certaintyFilter, setCertaintyFilter] = useState<CertaintyLevel | 'todos'>('todos');
  const [mobileViewMode, setMobileViewMode] = useState<'grid' | 'stacked' | 'tabs'>('grid');
  const [activeTabBlock, setActiveTabBlock] = useState<CanvasBlockId>('propuestaValor');
  const [addingNoteBlock, setAddingNoteBlock] = useState<CanvasBlockId | null>(null);
  const [quickNoteText, setQuickNoteText] = useState('');
  const [quickCertainty, setQuickCertainty] = useState<CertaintyLevel>('verde');

  const getFilteredNotes = (blockId: CanvasBlockId) => {
    return project.notas.filter(n => {
      if (n.bloque !== blockId) return false;
      if (certaintyFilter !== 'todos' && n.estado !== certaintyFilter) return false;
      if (searchFilter.trim() && !n.texto.toLowerCase().includes(searchFilter.toLowerCase())) return false;
      return true;
    });
  };

  const handleUpdateNote = (updatedNote: CanvasNote) => {
    const updatedNotas = project.notas.map(n => n.id === updatedNote.id ? updatedNote : n);
    onUpdateProject({ ...project, notas: updatedNotas });
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotas = project.notas.filter(n => n.id !== id);
    onUpdateProject({ ...project, notas: updatedNotas });
  };

  const handleMoveNote = (id: string, direction: 'up' | 'down') => {
    const targetNote = project.notas.find(n => n.id === id);
    if (!targetNote) return;
    const blockNotes = project.notas.filter(n => n.bloque === targetNote.bloque);
    const index = blockNotes.findIndex(n => n.id === id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= blockNotes.length) return;
    const updatedNotas = [...project.notas];
    const n1 = updatedNotas.find(n => n.id === blockNotes[index].id);
    const n2 = updatedNotas.find(n => n.id === blockNotes[swapIndex].id);
    if (n1 && n2) {
      const tempOrden = n1.orden;
      n1.orden = n2.orden;
      n2.orden = tempOrden;
    }
    onUpdateProject({ ...project, notas: updatedNotas });
  };

  const handleMoveToBlock = (id: string, targetBlock: CanvasBlockId) => {
    const updatedNotas = project.notas.map(n => {
      if (n.id === id) {
        return { ...n, bloque: targetBlock, fechaActualizacion: new Date().toISOString() };
      }
      return n;
    });
    onUpdateProject({ ...project, notas: updatedNotas });
  };

  const handleAddQuickNote = () => {
    if (!addingNoteBlock || !quickNoteText.trim()) return;
    const blockNotes = project.notas.filter(n => n.bloque === addingNoteBlock);
    const newNote: CanvasNote = {
      id: 'note-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      bloque: addingNoteBlock,
      texto: quickNoteText.trim(),
      estado: quickCertainty,
      orden: blockNotes.length + 1,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString()
    };
    onUpdateProject({ ...project, notas: [...project.notas, newNote] });
    setQuickNoteText('');
    setAddingNoteBlock(null);
  };

  const renderBlockBox = (blockId: CanvasBlockId, minHeightClass = 'min-h-[220px]') => {
    const meta = CANVAS_BLOCKS[blockId];
    const notes = getFilteredNotes(blockId);
    const totalBlockNotes = project.notas.filter(n => n.bloque === blockId).length;
    return (
      <div
        key={blockId}
        className={`p-3 rounded-2xl border ${meta.colorBg} ${meta.colorBorder} ${minHeightClass} flex flex-col justify-between transition-all relative group`}
      >
        <div>
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-bold text-slate-800 truncate">{meta.tituloTecnico}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">{notes.length}</span>
              <button
                onClick={() => setAddingNoteBlock(blockId)}
                className="p-1 bg-white hover:bg-indigo-50 text-indigo-700 rounded-lg border border-slate-200 shadow-2xs transition-colors"
                title={`Agregar nota a ${meta.tituloTecnico}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mb-3 italic">"{meta.tituloEmprendedor}"</p>
          {notes.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-slate-300 rounded-xl bg-white/50">
              <p className="text-[11px] text-slate-400 font-medium">Sin notas aún</p>
              <button onClick={() => setAddingNoteBlock(blockId)} className="mt-1 text-[11px] text-indigo-600 hover:underline font-semibold">+ Agregar idea</button>
            </div>
          ) : (
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {notes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onUpdateNote={handleUpdateNote}
                  onDeleteNote={handleDeleteNote}
                  onMoveNote={handleMoveNote}
                  onMoveToBlock={handleMoveToBlock}
                  onOpenExperimentModal={onOpenExperimentModal}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
          <span>{totalBlockNotes} notas totales</span>
          <button onClick={onOpenWizard} className="text-indigo-600 font-semibold hover:underline">Editar con guía →</button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Buscar en notas..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
            <button onClick={() => setCertaintyFilter('todos')} className={`px-2.5 py-1 rounded-lg font-medium transition-all ${certaintyFilter === 'todos' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}>Todas ({project.notas.length})</button>
            <button onClick={() => setCertaintyFilter('verde')} className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${certaintyFilter === 'verde' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-emerald-700'}`}><CheckCircle2 className="w-3 h-3" /> Validadas</button>
            <button onClick={() => setCertaintyFilter('amarillo')} className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${certaintyFilter === 'amarillo' ? 'bg-amber-500 text-white shadow-2xs' : 'text-slate-600 hover:text-amber-700'}`}><AlertTriangle className="w-3 h-3" /> Hipótesis</button>
            <button onClick={() => setCertaintyFilter('rojo')} className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${certaintyFilter === 'rojo' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 hover:text-rose-700'}`}><HelpCircle className="w-3 h-3" /> Pendientes</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex sm:hidden bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setMobileViewMode('grid')} className={`px-2 py-1 rounded-lg text-xs ${mobileViewMode === 'grid' ? 'bg-white font-bold' : 'text-slate-600'}`}>Grid</button>
            <button onClick={() => setMobileViewMode('tabs')} className={`px-2 py-1 rounded-lg text-xs ${mobileViewMode === 'tabs' ? 'bg-white font-bold' : 'text-slate-600'}`}>Solapas</button>
            <button onClick={() => setMobileViewMode('stacked')} className={`px-2 py-1 rounded-lg text-xs ${mobileViewMode === 'stacked' ? 'bg-white font-bold' : 'text-slate-600'}`}>Lista</button>
          </div>
          <button onClick={onOpenWizard} className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 flex items-center gap-1.5 transition-colors"><Compass className="w-4 h-4" /> Asistente Guiado</button>
        </div>
      </div>

      {mobileViewMode === 'tabs' && (
        <div className="sm:hidden space-y-4">
          <div className="flex overflow-x-auto gap-1 pb-2 scrollbar-none">
            {Object.values(CANVAS_BLOCKS).map(b => (
              <button
                key={b.id}
                onClick={() => setActiveTabBlock(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTabBlock === b.id ? `${b.colorBg} ${b.colorBadge} shadow-xs border` : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                {b.tituloTecnico}
              </button>
            ))}
          </div>
          {renderBlockBox(activeTabBlock, 'min-h-[400px]')}
        </div>
      )}

      {(mobileViewMode === 'grid' || mobileViewMode === 'stacked') && (
        <div className={`space-y-4 ${mobileViewMode === 'stacked' ? 'block' : ''}`} id="canvas-printable-area">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-1">{renderBlockBox('sociosClave', 'h-full min-h-[380px]')}</div>
            <div className="md:col-span-1 flex flex-col gap-4">
              {renderBlockBox('actividadesClave', 'flex-1 min-h-[185px]')}
              {renderBlockBox('recursosClave', 'flex-1 min-h-[185px]')}
            </div>
            <div className="md:col-span-1">{renderBlockBox('propuestaValor', 'h-full min-h-[380px]')}</div>
            <div className="md:col-span-1 flex flex-col gap-4">
              {renderBlockBox('relacionesClientes', 'flex-1 min-h-[185px]')}
              {renderBlockBox('canales', 'flex-1 min-h-[185px]')}
            </div>
            <div className="md:col-span-1">{renderBlockBox('segmentosClientes', 'h-full min-h-[380px]')}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>{renderBlockBox('estructuraCostos', 'min-h-[180px]')}</div>
            <div>{renderBlockBox('fuentesIngresos', 'min-h-[180px]')}</div>
          </div>
        </div>
      )}

      {addingNoteBlock && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-bold text-slate-900">Agregar nota a {CANVAS_BLOCKS[addingNoteBlock].tituloTecnico}</h3>
              <button onClick={() => setAddingNoteBlock(null)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
            </div>
            <textarea
              value={quickNoteText}
              onChange={e => setQuickNoteText(e.target.value)}
              placeholder="Escribí tu nota o idea corta..."
              className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
              rows={3}
              autoFocus
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estado de certeza:</label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setQuickCertainty('verde')} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border ${quickCertainty === 'verde' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>✓ Validado</button>
                <button type="button" onClick={() => setQuickCertainty('amarillo')} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border ${quickCertainty === 'amarillo' ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>! Hipótesis</button>
                <button type="button" onClick={() => setQuickCertainty('rojo')} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border ${quickCertainty === 'rojo' ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>? Pendiente</button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setAddingNoteBlock(null)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
              <button type="button" onClick={handleAddQuickNote} disabled={!quickNoteText.trim()} className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg disabled:opacity-50 hover:bg-indigo-700">Guardar Nota</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

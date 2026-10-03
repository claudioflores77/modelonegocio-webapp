import React, { useEffect, useState } from 'react';
import { CanvasBoard } from './components/CanvasBoard';
import { GuidedWizard } from './components/GuidedWizard';
import { CoherenceRadarView } from './components/CoherenceRadarView';
import { Header } from './components/Header';
import type { CanvasProject, CanvasNote } from './types/canvas';
import {
  getStoredProjects,
  setActiveProjectId,
  getActiveProjectId,
  saveProject,
  deleteProject,
  duplicateProject
} from './services/storage';
import { ExperimentModal } from './components/ExperimentModal';
import { Plus, Trash2, Copy, FolderOpen, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<CanvasProject[]>(() => getStoredProjects());
  const [activeProject, setActiveProject] = useState<CanvasProject | null>(() => {
    const loaded = getStoredProjects();
    const activeId = getActiveProjectId();
    return loaded.find(p => p.id === activeId) || loaded[0] || null;
  });
  const [view, setView] = useState<'wizard' | 'board' | 'radar'>('board');
  const [experimentNote, setExperimentNote] = useState<null | CanvasNote>(null);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  // New project form state
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  useEffect(() => {
    if (activeProject) {
      setActiveProjectId(activeProject.id);
    }
  }, [activeProject]);

  const updateProject = (proj: CanvasProject) => {
    const updated = saveProject(proj);
    setProjects(updated);
    setActiveProject(proj);
  };

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newProj: CanvasProject = {
      id: 'proj-' + Date.now(),
      nombreProyecto: newProjectName.trim(),
      descripcionBreve: newProjectDesc.trim() || 'Nuevo modelo de negocios',
      tipoProyecto: 'idea',
      sector: 'General',
      etapa: 'idea',
      objetivo: 'ordenar_idea',
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
      notas: []
    };

    const updated = saveProject(newProj);
    setProjects(updated);
    setActiveProject(newProj);
    setNewProjectName('');
    setNewProjectDesc('');
    setShowNewProjectModal(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      const remaining = deleteProject(id);
      setProjects(remaining);
      const activeId = getActiveProjectId();
      const nextActive = remaining.find(p => p.id === activeId) || remaining[0] || null;
      setActiveProject(nextActive);
    }
  };

  const handleDuplicateProject = (id: string) => {
    const updated = duplicateProject(id);
    setProjects(updated);
    const activeId = getActiveProjectId();
    const nextActive = updated.find(p => p.id === activeId) || updated[0] || null;
    setActiveProject(nextActive);
  };

  const openExperiment = (note: CanvasNote) => {
    setExperimentNote(note);
  };

  const closeExperiment = () => {
    setExperimentNote(null);
  };

  const handleExperimentSave = (noteId: string, data: any) => {
    if (!activeProject) return;
    const updatedNotes = activeProject.notas.map(n => n.id === noteId ? { ...n, experimento: data } : n);
    const updatedProj = { ...activeProject, notas: updatedNotes };
    updateProject(updatedProj);
    closeExperiment();
  };

  const renderView = () => {
    if (!activeProject) return (
      <div className="p-12 text-center text-slate-500">
        <p className="text-sm font-semibold mb-3">No hay ningún proyecto activo.</p>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Crear un Canvas
        </button>
      </div>
    );

    switch (view) {
      case 'wizard':
        return (
          <GuidedWizard
            project={activeProject}
            onUpdateProject={updateProject}
            onFinishWizard={() => setView('board')}
            onOpenExperimentModal={openExperiment}
          />
        );
      case 'board':
        return (
          <CanvasBoard
            project={activeProject}
            onUpdateProject={updateProject}
            onOpenWizard={() => setView('wizard')}
            onOpenExperimentModal={openExperiment}
          />
        );
      case 'radar':
        return (
          <CoherenceRadarView
            project={activeProject}
            onUpdateProject={updateProject}
            onOpenExperimentModal={openExperiment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        activeProject={activeProject}
        activeView={view}
        setActiveView={setView}
        onOpenProjects={() => setShowProjectsModal(true)}
        onNewProject={() => setShowNewProjectModal(true)}
        totalNotes={activeProject?.notas.length ?? 0}
      />

      <main className="flex-1 overflow-y-auto">{renderView()}</main>

      {/* Experiment Modal */}
      {experimentNote && (
        <ExperimentModal
          note={experimentNote}
          onSave={handleExperimentSave}
          onClose={closeExperiment}
        />
      )}

      {/* Projects List Modal */}
      {showProjectsModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-indigo-600" />
                Mis Proyectos Guardados ({projects.length})
              </h3>
              <button onClick={() => setShowProjectsModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {projects.map(p => (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    activeProject?.id === p.id
                      ? 'bg-indigo-50/70 border-indigo-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{p.nombreProyecto}</h4>
                      {activeProject?.id === p.id && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">Activo</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{p.descripcionBreve || 'Sin descripción'} • {p.notas.length} notas</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {activeProject?.id !== p.id && (
                      <button
                        onClick={() => {
                          setActiveProject(p);
                          setShowProjectsModal(false);
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg"
                      >
                        Seleccionar
                      </button>
                    )}
                    <button
                      onClick={() => handleDuplicateProject(p.id)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                      title="Duplicar"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {projects.length > 1 && (
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center border-t">
              <button
                onClick={() => {
                  setShowProjectsModal(false);
                  setShowNewProjectModal(true);
                }}
                className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Nuevo Proyecto
              </button>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Crear un Nuevo Canvas
              </h3>
              <button onClick={() => setShowNewProjectModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateNewProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre del Proyecto / Negocio:</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  placeholder="Ej: Cafetería de Especialidad Norte..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descripción breve (opcional):</label>
                <input
                  type="text"
                  value={newProjectDesc}
                  onChange={e => setNewProjectDesc(e.target.value)}
                  placeholder="Ej: Servicio de viandas saludables para oficinas..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newProjectName.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl disabled:opacity-50"
                >
                  Crear Canvas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

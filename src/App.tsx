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
import { Plus, Trash2, Copy, FolderOpen, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

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

  // Toast / Feedback message state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Dark Mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

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
    showToast('Nuevo Canvas creado exitosamente');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      const remaining = deleteProject(id);
      setProjects(remaining);
      const activeId = getActiveProjectId();
      const nextActive = remaining.find(p => p.id === activeId) || remaining[0] || null;
      setActiveProject(nextActive);
      showToast('Proyecto eliminado exitosamente', 'error');
    }
  };

  const handleDuplicateProject = (id: string) => {
    const updated = duplicateProject(id);
    setProjects(updated);
    const activeId = getActiveProjectId();
    const nextActive = updated.find(p => p.id === activeId) || updated[0] || null;
    setActiveProject(nextActive);
    showToast('Proyecto duplicado exitosamente');
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
    showToast('Experimento guardado exitosamente');
  };

  const renderView = () => {
    if (!activeProject) return (
      <div className="p-12 text-center text-slate-500 dark:text-slate-400 space-y-4 max-w-xl mx-auto my-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
        <Sparkles className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto" />
        <p className="text-base font-bold text-slate-900 dark:text-white">Comienza tu primer modelo de negocio</p>
        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          Usa el wizard guiado para definir tu propuesta de valor, clientes y más en 5 minutos.
        </p>
        <div className="flex justify-center space-x-3 pt-2">
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Crear Canvas
          </button>
          <button
            onClick={() => setView('wizard')}
            className="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-xl text-xs font-bold transition-colors border border-indigo-200 dark:border-indigo-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Ver ejemplo
          </button>
        </div>
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        activeProject={activeProject}
        activeView={view}
        setActiveView={setView}
        onOpenProjects={() => setShowProjectsModal(true)}
        onNewProject={() => setShowNewProjectModal(true)}
        totalNotes={activeProject?.notas.length ?? 0}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onShowToast={showToast}
      />

      {/* Toast Feedback Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold shadow-lg border animate-in fade-in transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          {toastMessage.type === 'success' ? (
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{toastMessage.text}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <span>{toastMessage.text}</span>
            </div>
          )}
        </div>
      )}

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
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Mis Proyectos Guardados ({projects.length})
              </h3>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Cerrar modal de proyectos"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {projects.map(p => (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    activeProject?.id === p.id
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700'
                      : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{p.nombreProyecto}</h4>
                      {activeProject?.id === p.id && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">Activo</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {p.descripcionBreve || 'Sin descripción'}
                      {p.notas.length > 0 && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">
                            {p.notas.length} nota{p.notas.length > 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {activeProject?.id !== p.id && (
                      <button
                        onClick={() => {
                          setActiveProject(p);
                          setShowProjectsModal(false);
                          showToast(`Proyecto '${p.nombreProyecto}' activado`);
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        Seleccionar
                      </button>
                    )}
                    <button
                      onClick={() => handleDuplicateProject(p.id)}
                      className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                      title="Duplicar proyecto"
                      aria-label="Duplicar proyecto"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {projects.length > 1 && (
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg border border-transparent hover:border-rose-200 dark:hover:border-rose-800 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500"
                        title="Eliminar proyecto"
                        aria-label="Eliminar proyecto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setShowProjectsModal(false);
                  setShowNewProjectModal(true);
                }}
                className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors border border-indigo-200 dark:border-indigo-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Plus className="w-4 h-4" />
                Nuevo Proyecto
              </button>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
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
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Crear un Nuevo Canvas
              </h3>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Cerrar modal nuevo proyecto"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewProject} className="space-y-4 text-xs">
              <div>
                <label htmlFor="project-name" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre del Proyecto / Negocio:
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  placeholder="Ej: Cafetería de Especialidad Norte..."
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus-visible:outline-hidden"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="project-desc" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descripción breve (opcional):
                </label>
                <input
                  id="project-desc"
                  type="text"
                  value={newProjectDesc}
                  onChange={e => setNewProjectDesc(e.target.value)}
                  placeholder="Ej: Servicio de viandas saludables para oficinas..."
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus-visible:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newProjectName.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl disabled:opacity-50 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
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

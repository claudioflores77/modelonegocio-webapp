import React from "react";
import {
  Sparkles,
  LayoutGrid,
  Compass,
  Radar,
  FolderOpen,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import type { CanvasProject } from "../types/canvas";
import { exportCanvasToPDF, exportCanvasToPNG } from "../utils/exportCanvas";

interface HeaderProps {
  activeProject: CanvasProject | null;
  activeView: "wizard" | "board" | "radar";
  setActiveView: (view: "wizard" | "board" | "radar") => void;
  onOpenProjects: () => void;
  onNewProject: () => void;
  totalNotes: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeProject,
  activeView,
  setActiveView,
  onOpenProjects,
  onNewProject,
  totalNotes,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Project Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2 rounded-xl shadow-xs flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 truncate text-base">
                  {activeProject ? activeProject.nombreProyecto : "Canvas de Negocios"}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Guardado local
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate hidden md:block">
                {activeProject?.descripcionBreve || "Modelo de negocios guiado paso a paso"} • {totalNotes} notas cargadas
              </p>
            </div>
          </div>

          {/* Navigation Modes */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('wizard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'wizard' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Paso a paso</span>
            </button>
            <button
              onClick={() => setActiveView('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'board' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-indigo-600" />
              <span>Canvas Visual</span>
            </button>
            <button
              onClick={() => setActiveView('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'radar' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radar className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Radar & Experimentos</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenProjects}
              className="p-2 sm:px-3 sm:py-1.5 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-200"
              title="Mis Canvas Guardados"
            >
              <FolderOpen className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Mis Proyectos</span>
            </button>

            <button
              onClick={exportCanvasToPDF}
              className="p-2 sm:px-3 sm:py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-indigo-200"
              title="Exportar Canvas a PDF"
            >
              PDF
            </button>
            <button
              onClick={exportCanvasToPNG}
              className="p-2 sm:px-3 sm:py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-indigo-200"
              title="Exportar Canvas a PNG"
            >
              PNG
            </button>

            <button
              onClick={onNewProject}
              className="p-2 sm:px-3 sm:py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              title="Crear un nuevo Canvas"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden lg:inline">Nuevo Canvas</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

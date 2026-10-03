import React, { useState } from 'react';
import type { CanvasNote } from '../types/canvas';

interface ExperimentModalProps {
  note: CanvasNote;
  onSave: (noteId: string, experimentData: CanvasNote['experimento']) => void;
  onClose: () => void;
}

export const ExperimentModal: React.FC<ExperimentModalProps> = ({
  note,
  onSave,
  onClose
}) => {
  const [queComprobar, setQueComprobar] = useState(note.experimento?.queComprobar || note.texto);
  const [conQuien, setConQuien] = useState(note.experimento?.conQuien || '');
  const [como, setComo] = useState(note.experimento?.como || '');
  const [senalExito, setSenalExito] = useState(note.experimento?.senalExito || '');
  const [paraCuando, setParaCuando] = useState(note.experimento?.paraCuando || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(note.id, {
      queComprobar,
      conQuien,
      como,
      senalExito,
      paraCuando
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-base font-bold text-slate-900">Diseñar Experimento de Validación</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">¿Qué hipótesis querés comprobar?</label>
            <input
              type="text"
              value={queComprobar}
              onChange={(e) => setQueComprobar(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">¿Con quién (público / clientes)?</label>
            <input
              type="text"
              value={conQuien}
              onChange={(e) => setConQuien(e.target.value)}
              placeholder="Ej: 10 clientes actuales de la base..."
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">¿Cómo lo vas a probar?</label>
            <textarea
              value={como}
              onChange={(e) => setComo(e.target.value)}
              placeholder="Ej: Publicar una encuesta de 3 preguntas en Historias..."
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Señal de éxito (Métrica/Criterio):</label>
            <input
              type="text"
              value={senalExito}
              onChange={(e) => setSenalExito(e.target.value)}
              placeholder="Ej: Conseguir al menos 15 respuestas positivas..."
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">¿Para cuándo?</label>
            <input
              type="text"
              value={paraCuando}
              onChange={(e) => setParaCuando(e.target.value)}
              placeholder="Ej: Próximo viernes..."
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
            >
              Guardar Experimento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

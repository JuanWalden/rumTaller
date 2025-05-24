
import React from 'react';
import { Target, Zap, Trophy, Brain } from 'lucide-react';
import { TechniqueExamples, StepData } from './types';

export const TECHNIQUE_EXAMPLES: TechniqueExamples = {
  identify: { name: 'Identificar Pensamiento', icon: '🤔', color: 'bg-green-500' },
  restructure: { name: 'Reestructuración Cognitiva', icon: '🔄', color: 'bg-blue-500' },
  mindfulness: { name: 'Mindfulness Corto', icon: '🧘', color: 'bg-purple-500' },
  distraction: { name: 'Técnica de Distracción', icon: '🎨', color: 'bg-cyan-500' }
};

export const STEPS_DATA: StepData[] = [
  {
    title: "1. La Señal (Disparador)",
    description: "Toda rumiación comienza con una señal o disparador que activa el patrón de pensamiento.",
    detail: "Puede ser un recuerdo, una situación, una emoción específica o incluso un pensamiento previo. Es el gatillo que inicia el ciclo.",
    icon: <Target className="w-8 h-8" />,
    color: "from-red-400 to-pink-500",
    examples: ["Sentirse ansioso", "Recordar un error", "Una crítica", "Silencio incómodo"]
  },
  {
    title: "2. El Patrón (Rumiación)",
    description: "Es el pensamiento repetitivo en sí mismo, la cadena de ideas que se repiten.",
    detail: "Suele ser negativo, centrado en problemas pasados o preocupaciones futuras, sin llegar a soluciones.",
    icon: <Zap className="w-8 h-8" />,
    color: "from-yellow-400 to-orange-500",
    examples: ["¿Y si hubiera...?", "No puedo dejar de pensar en...", "Siempre me pasa lo mismo", "Esto es terrible"]
  },
  {
    title: "3. La Consecuencia (Impacto)",
    description: "El efecto que tiene la rumiación en tu estado de ánimo y comportamiento.",
    detail: "A menudo intensifica emociones negativas, reduce la capacidad de concentración y puede llevar al aislamiento o inacción.",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-green-400 to-emerald-500",
    examples: ["Aumento de ansiedad", "Tristeza profunda", "Parálisis por análisis", "Irritabilidad"]
  },
  {
    title: "4. La Interrupción (Alternativa)",
    description: "Aplicar una técnica para romper el ciclo de rumiación y redirigir la atención.",
    detail: "Implica tomar conciencia del patrón y elegir activamente una estrategia para cambiar el enfoque mental.",
    icon: <Brain className="w-8 h-8" />,
    color: "from-purple-400 to-indigo-500",
    examples: ["Mindfulness", "Reenfocar en la tarea actual", "Ejercicio físico", "Hablar con alguien"]
  }
];

export const DEFAULT_TECHNIQUE_KEY = 'identify';

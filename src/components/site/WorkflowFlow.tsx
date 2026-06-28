"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { FlowNode } from "@/lib/data";

export function WorkflowFlow({ nodes }: { nodes: FlowNode[] }) {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setActiveStep(nodes.length);
      return;
    }
    setActiveStep(0);
    const id = setInterval(() => {
      setActiveStep((s) => (s + 1) % (nodes.length + 1));
    }, 1400);
    return () => clearInterval(id);
  }, [nodes, reduceMotion]);

  return (
    <div>
      {nodes.map((node, i) => {
        const active = i < activeStep;
        return (
          <div key={node.label}>
            <div
              className={`flex items-center gap-2.5 px-4 py-3 rounded-md border text-[12px] mb-1 transition-colors duration-300 ${
                active
                  ? "bg-cyan-dim border-cyan-border text-cyan"
                  : "bg-white/[0.02] border-white/[0.05] text-white/40"
              }`}
            >
              <span>{node.icon}</span>
              <span className="flex-1">{node.label}</span>
              <span
                className={`font-heading text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-sm transition-colors duration-300 ${
                  active ? "bg-cyan/10 text-cyan" : "bg-white/[0.04] text-white/30"
                }`}
              >
                {node.tag}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <div
                className={`w-px h-4 ml-[26px] transition-colors duration-300 ${
                  active ? "bg-gradient-to-b from-cyan/40 to-transparent" : "bg-white/[0.06]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

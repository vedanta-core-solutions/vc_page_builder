'use client';
import React from 'react';
import { useContent } from '@/context/ContentContext';

export default function HeaderVariantChooser() {
  const { content = {}, selectionMap = {}, setSelectionMap } = useContent();
  const variants = content?.navbar?.variants || [];
  const active = selectionMap?.navbar;

  function choose(key) {
    setSelectionMap(prev => ({ ...(prev || {}), navbar: key }));
  }

  return (
    <div className="p-3 bg-surface border rounded-sm">
      <h4 className="mb-2 font-medium">Header variants</h4>
      <div className="flex gap-2">
        {variants.map(v => (
          <button
            key={v.key}
            onClick={() => choose(v.key)}
            className={`px-3 py-1 border ${active === v.key ? 'border-primary font-semibold' : 'border-gray-300'}`}
          >
            {v.label || v.key}
          </button>
        ))}
      </div>
    </div>
  );
}

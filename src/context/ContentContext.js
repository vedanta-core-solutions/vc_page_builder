"use client";

import { createContext, useContext } from "react";

const ContentContext = createContext(null);

export function ContentProvider({ content, children }) {
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
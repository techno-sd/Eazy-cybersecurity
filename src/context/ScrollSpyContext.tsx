"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface ScrollSpyContextType {
  activeSection: string;
}

const ScrollSpyContext = createContext<ScrollSpyContextType>({
  activeSection: "",
});

export const useScrollSpy = () => useContext(ScrollSpyContext);

interface ScrollSpyProviderProps {
  activeSection: string;
  children: ReactNode;
}

export const ScrollSpyProvider: React.FC<ScrollSpyProviderProps> = ({
  activeSection,
  children,
}) => {
  return (
    <ScrollSpyContext.Provider value={{ activeSection }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};

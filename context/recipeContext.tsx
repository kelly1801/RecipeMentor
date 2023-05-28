import React, { createContext, useState, ReactNode } from "react";

interface RecipeContextType {
  isVisible: boolean;
  showSidebar: () => void;
}

const RecipeContext = createContext<RecipeContextType>({
  isVisible: true,
  showSidebar: () => {},
});

export default RecipeContext;

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const showSidebar = () => {
    setIsVisible((value) => !value);
  };

  return (
    <RecipeContext.Provider value={{ isVisible, showSidebar }}>
      {children}
    </RecipeContext.Provider>
  );
};

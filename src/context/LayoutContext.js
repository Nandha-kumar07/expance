import { createContext, useContext, useState, useEffect } from 'react';

const LayoutContext = createContext();

const LAYOUT_KEY = 'dashboard-layout';

const defaultLayout = [
  { id: 'net-balance', x: 0, y: 0, w: 1, h: 1 },
  { id: 'income-vs-expenses', x: 1, y: 0, w: 1, h: 1 },
  { id: 'payment-methods', x: 2, y: 0, w: 1, h: 1 },
  { id: 'daily-spending', x: 0, y: 1, w: 3, h: 1 }
];

const layoutPresets = {
  default: [...defaultLayout],
  focused: [
    { id: 'net-balance', x: 0, y: 0, w: 3, h: 1 },
    { id: 'income-vs-expenses', x: 0, y: 1, w: 3, h: 1 },
    { id: 'payment-methods', x: 0, y: 2, w: 3, h: 1 },
    { id: 'daily-spending', x: 0, y: 3, w: 3, h: 1 }
  ],
  compact: [
    { id: 'net-balance', x: 0, y: 0, w: 1, h: 1 },
    { id: 'income-vs-expenses', x: 1, y: 0, w: 1, h: 1 },
    { id: 'payment-methods', x: 2, y: 0, w: 1, h: 1 },
    { id: 'daily-spending', x: 0, y: 1, w: 3, h: 1 }
  ]
};

export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState(() => {
    const saved = localStorage.getItem(LAYOUT_KEY);
    return saved ? JSON.parse(saved) : defaultLayout;
  });

  useEffect(() => {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
  }, [layout]);

  const applyPreset = (presetKey) => {
    setLayout([...layoutPresets[presetKey]]);
  };

  const resetLayout = () => {
    setLayout([...defaultLayout]);
  };

  return (
    <LayoutContext.Provider value={{ layout, setLayout, applyPreset, resetLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);

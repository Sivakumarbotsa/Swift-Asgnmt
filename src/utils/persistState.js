export const saveState = (state) => {
  localStorage.setItem('dashboardState', JSON.stringify(state));
};

export const loadState = () => {
  const state = localStorage.getItem('dashboardState');
  return state ? JSON.parse(state) : null;
};

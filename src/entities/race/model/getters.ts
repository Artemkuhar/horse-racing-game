const getters = {
  isRunning: (state: { status: string }) => state.status === 'running',
};

export default getters;

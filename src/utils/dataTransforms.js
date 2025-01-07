export const formatDuration = (duration) => {
  const { secs, nanos } = duration;
  return `${secs}.${Math.floor(nanos / 1000000)}s`;
};

export const formatMemory = (memoryKb) => {
  if (memoryKb >= 1024 * 1024) {
    return `${(memoryKb / (1024 * 1024)).toFixed(2)} GB`;
  }
  if (memoryKb >= 1024) {
    return `${(memoryKb / 1024).toFixed(2)} MB`;
  }
  return `${memoryKb} KB`;
};

export const formatCpuUsage = (cpuPercent) => {
  return `${cpuPercent.toFixed(1)}%`;
};

export const formatDurationShort = (duration) => {
  const totalMs = duration.secs * 1000 + duration.nanos / 1000000;
  if (totalMs < 1000) {
    return `${totalMs.toFixed(0)}ms`;
  }
  return `${(totalMs / 1000).toFixed(1)}s`;
}; 
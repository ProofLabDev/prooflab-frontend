export const formatDuration = (duration) => {
  if (!duration) return 'N/A';
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
  if (!duration) return 'N/A';
  const totalMs = duration.secs * 1000 + duration.nanos / 1000000;
  if (totalMs < 1000) {
    return `${totalMs.toFixed(0)}ms`;
  }
  return `${(totalMs / 1000).toFixed(1)}s`;
};

export const formatFrequency = (hz) => {
  if (!hz && hz !== 0) return 'N/A';
  
  if (hz >= 1e9) {
    return `${(hz / 1e9).toFixed(2)} GHz`;
  } else if (hz >= 1e6) {
    return `${(hz / 1e6).toFixed(2)} MHz`;
  } else if (hz >= 1e3) {
    return `${(hz / 1e3).toFixed(2)} kHz`;
  } else {
    return `${hz.toFixed(2)} Hz`;
  }
};

// EC2 pricing in USD per hour (based on us-east-1)
const EC2_PRICING = {
  // AMD-based instances
  'c7a.16xlarge': 2.4480,
  'c7a.8xlarge': 1.2240,
  'c7a.4xlarge': 0.6120,
  'c7a.2xlarge': 0.3060,
  'c7a.xlarge': 0.1530,
  'c7a.large': 0.0383,

  // Intel-based instances
  'c7i.16xlarge': 2.7200,
  'c7i.8xlarge': 1.3600,
  'c7i.4xlarge': 0.6800,
  'c7i.2xlarge': 0.3400,
  'c7i.xlarge': 0.1700,
  'c7i.large': 0.0425,

  // Memory optimized instances
  'r7i.large': 0.168,
  'r7i.xlarge': 0.336,
  'r7i.2xlarge': 0.672,
  'r7i.4xlarge': 1.344,
  'r7i.8xlarge': 2.688,
  'r7i.12xlarge': 4.032,
  'r7i.16xlarge': 5.376,
  'r7i.24xlarge': 8.064,
  'r7i.metal': 8.064,

  // Memory optimized instances with Intel Xeon processors
  'r7iz.12xlarge': 4.464,
  'r7iz.16xlarge': 5.952,

  // G6 instance types
  'g6.xlarge': 0.805,
  'g6.2xlarge': 0.978,
  'g6.4xlarge': 1.323,
  'g6.8xlarge': 2.014,
  'g6.12xlarge': 4.602,
  'g6.16xlarge': 3.397,
  'g6.24xlarge': 6.675,
  'g6.48xlarge': 13.35,
  'gr6.4xlarge': 1.539,
  'gr6.8xlarge': 2.446,
};

export const calculateEC2Cost = (duration, instanceType) => {
  if (!duration || !instanceType || !EC2_PRICING[instanceType]) return null;

  // Convert duration to hours
  const totalNanos = duration.secs * 1000000000 + duration.nanos;
  const hours = totalNanos / (1000000000 * 3600);
  
  // Calculate cost
  const cost = hours * EC2_PRICING[instanceType];
  return cost;
};

export const formatCost = (cost) => {
  if (cost === null || cost === undefined) return 'N/A';
  if (cost < 0.01) {
    return `$${cost.toFixed(5)}`;
  }
  if (cost < 0.1) {
    return `$${cost.toFixed(4)}`;
  }
  return `$${cost.toFixed(3)}`;
}; 
exports.updateCpuUsage = (cpuUsage, cpuUsageHistory, cpuUsageMaxLength) => {
  if (cpuUsageHistory.length >= cpuUsageMaxLength) {
    cpuUsageHistory.shift();
  }

  cpuUsageHistory.push([0, cpuUsage]);

  for (let i = 0; i < cpuUsageMaxLength; i++) {
    cpuUsageHistory[i][0] = i;
  }
};

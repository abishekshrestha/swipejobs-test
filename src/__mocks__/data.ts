export const userProfileDataUrl = (workerId: string) =>
  `https://test.swipejobs.com/api/worker/${workerId}/profile`;

export const workerJobMatchesUrl = (workerId: string) =>
  `https://test.swipejobs.com/api/worker/${workerId}/matches`;

export const acceptJobIdUrl = (workerId: string, jobId: string) =>
  `https://test.swipejobs.com/api/worker/${workerId}/job/${jobId}/accept`;

export const rejectJobIdUrl = (workerId: string, jobId: string) =>
  `https://test.swipejobs.com/api/worker/${workerId}/job/${jobId}/reject`;

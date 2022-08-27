export interface IUser {
  firstName: string;
  lastName: string;
  workerId?: string;
}

export interface IJobDetail {
  jobTitle: {
    imageUrl: string;
    name: string;
  };
  jobId: string;
  milesToTravel?: string | number;
  wagePerHourInCents: string | number;
  company: {
    name: string;
    address: {
      formattedAddress: string;
      zoneId: string;
    };
    reportTo: {
      name: string;
      phone: string;
    };
  };
  shifts?: {
    startDate: string;
    endDate: string;
  }[];
  requirements?: string[];
}

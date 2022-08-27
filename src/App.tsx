import { useEffect, useState } from 'react';
import './App.css';
import { IJobDetail, IUser } from './models/job';
import Header from './components/Header/Header';
import JobCard from './components/JobCard/JobCard';
import {
  acceptJobIdUrl,
  rejectJobIdUrl,
  userProfileDataUrl,
  workerJobMatchesUrl,
} from './__mocks__/data';
import axios from 'axios';

const initialUserData: IUser = {
  firstName: '',
  lastName: '',
};

const initialJobData: IJobDetail[] = [
  {
    jobTitle: {
      imageUrl: '',
      name: '',
    },
    company: {
      name: '',
      address: {
        formattedAddress: '',
        zoneId: '',
      },
      reportTo: {
        name: '',
        phone: '',
      },
    },
    shifts: [],
    requirements: [],
    wagePerHourInCents: '',
    jobId: '',
  },
];

const App = () => {
  const WORKER_ID = '7f90df6e-b832-44e2-b624-3143d428001f';

  const [userDetail, setUserDetail] = useState<IUser>(initialUserData);
  const [jobDetail, setJobDetail] = useState<IJobDetail[]>(initialJobData);
  const [jobIndex, setJobIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [noJobsLeft, setNoJobsLeft] = useState(false);

  const jobDataApi = (id: string) => {
    axios.get(workerJobMatchesUrl(id)).then((res) => {
      setJobDetail(res?.data);
    });
  };

  const fetchUserData = async () => {
    return await axios.get(userProfileDataUrl(WORKER_ID));
  };
  
  useEffect(() => {
    fetchUserData()
      .then((res) => {
        setUserDetail(res?.data);
        jobDataApi(res?.data?.workerId);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, []);

  const onUserJobInteraction = (url: string) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (!res.data.success) throw res.data;
        if (res.data.success && jobIndex < jobDetail.length - 1)
          setJobIndex(jobIndex + 1);

        if (jobIndex >= jobDetail.length - 1) {
          setNoJobsLeft(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.message);
        console.log('Error:', err.message);
      });
  };

  const handleRejectButton = () => {
    if (isLoading) {
      return;
    }

    const url = rejectJobIdUrl(
      userDetail?.workerId || '',
      jobDetail[jobIndex]?.jobId
    );
    onUserJobInteraction(url);
  };

  const handleAcceptButton = () => {
    if (isLoading) {
      return;
    }

    const url = acceptJobIdUrl(
      userDetail?.workerId || '',
      jobDetail[jobIndex]?.jobId
    );
    onUserJobInteraction(url);
  };

  return (
    <div className='App'>
      <Header
        firstName={userDetail?.firstName}
        lastName={userDetail.lastName}
      />
      <div className='container'>
        {noJobsLeft ? (
          'No jobs available'
        ) : (
          <JobCard
            jobTitle={jobDetail[jobIndex]?.jobTitle}
            company={jobDetail[jobIndex]?.company}
            milesToTravel={jobDetail[jobIndex]?.milesToTravel}
            wagePerHourInCents={jobDetail[jobIndex]?.wagePerHourInCents}
            shifts={jobDetail[jobIndex]?.shifts}
            requirements={jobDetail[jobIndex]?.requirements}
            jobId={jobDetail[jobIndex]?.jobId}
            handleAcceptButton={handleAcceptButton}
            handleRejectButton={handleRejectButton}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default App;

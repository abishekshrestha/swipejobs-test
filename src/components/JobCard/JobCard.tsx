import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HandymanIcon from '@mui/icons-material/Handyman';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatToTimeZone } from 'date-fns-timezone';
import { IJobDetail } from '../../models/job';
import Spinner from '../Spinner/Spinner';
import './jobCard.scss';

interface IProps extends IJobDetail {
  handleAcceptButton?: () => void;
  handleRejectButton?: () => void;
  isLoading?: boolean;
}

const JobCard = ({
  jobTitle,
  company,
  milesToTravel,
  wagePerHourInCents,
  shifts,
  requirements,
  handleAcceptButton,
  handleRejectButton,
  isLoading,
}: IProps) => {
  const { address, name, reportTo } = company || {};

  /**
   * Calculate wage in dollar value
   */
  const wagePerHourInDollar = Number(wagePerHourInCents) / 100;

  /**
   * Date format
   */
  const dateFormatStart = 'MMM D, ddd h:mm a';
  const dateFormatEnd = 'h:mm a z';

  /**
   * Function to format the date depending upon timezone
   */
  const convertDateTimezone = (
    date: string,
    format: string = dateFormatStart
  ) =>
    formatToTimeZone(new Date(date), format, {
      timeZone: company?.address?.zoneId,
    });

  /**
   * Format phone number. E.g. (123) 456 7890
   */
  const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}`;
    }
    return null;
  };

  return (
    <div className='job-card'>
      <img className='image-style' src={jobTitle?.imageUrl} alt='job_image' />
      <div className='job-description job-card-container'>
        <p className='job-description__title'>{jobTitle?.name}</p>
        <p className='job-description__company'>{name}</p>
      </div>
      <div className='distance-rate-info job-card-container'>
        <div>
          <div className='distance-rate-info__title'>Distance</div>
          <div className='distance-rate-info__value'>
            {Number(milesToTravel).toFixed(1)} miles
          </div>
        </div>
        <div>
          <div className='distance-rate-info__title text-align-end'>
            Hourly Rate
          </div>
          <div className='distance-rate-info__value text-align-end'>
            <sup className='distance-rate-info__dollar'>$</sup>
            {wagePerHourInDollar.toFixed(2)}
          </div>
        </div>
      </div>
      <div className='job-card-container job-card-container--content'>
        <div>
          {shifts && (
            <div className='job-item'>
              <CalendarMonthIcon className='job-item__icon' />
              <div className='job-item__content'>
                <p className='job-item__title'>Shift Dates</p>
                {shifts?.map((item, idx) => (
                  <div className='job-item__date' key={idx}>
                    <div>
                      {convertDateTimezone(item?.startDate, dateFormatStart)} -{' '}
                      {convertDateTimezone(item?.endDate, dateFormatEnd)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {address?.formattedAddress && (
            <a
              href='https://map.google.com'
              className='job-item job-item__location'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LocationOnIcon className='job-item__icon' />
              <div className='job-item__content'>
                <p className='job-item__title'>Location</p>
                <p className=''>{address?.formattedAddress}</p>
                {milesToTravel && (
                  <p className='job-item__content--small'>
                    {Number(milesToTravel).toFixed(2)} miles from your job
                    search location
                  </p>
                )}
              </div>
              <ArrowForwardIosIcon className='job-item__chevron' />
            </a>
          )}

          {requirements && (
            <div className='job-item'>
              <HandymanIcon className='job-item__icon' />
              <div className='job-item__content'>
                <p className='job-item__title'>Requirements</p>
                {requirements?.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </div>
          )}

          {reportTo && (
            <div className='job-item'>
              <AccountCircleIcon className='job-item__icon' />
              <div className='job-item__content'>
                <p className='job-item__title'>Report To</p>
                <p>
                  {reportTo?.name.split(' ')[0]}{' '}
                  {formatPhoneNumber(reportTo?.phone)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className='button-section'>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <button
                onClick={handleRejectButton}
                className='button button-light'
              >
                No Thanks
              </button>
              <button
                onClick={handleAcceptButton}
                className='button button-dark'
              >
                "I'll Take it
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;

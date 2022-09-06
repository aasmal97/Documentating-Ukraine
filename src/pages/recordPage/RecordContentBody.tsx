import { RecordSubmissionType } from "../../types";
import ConditionalWrapper from "../utilityComponents/conditionalWrapper/ConditionalWrapper";
import RecordMediaCarousel from "./RecordMediaCarousel";
const googleAPIRoute = "https://www.google.com/maps/search/?api=1&query=";
const RecordContentDate = ({
  date,
  prefix,
  namespace,
}: {
  date: string | Date;
  prefix: string;
  namespace: string;
}) => {
  return (
    <span className={`${namespace}-date-item`}>
      {prefix}
      <br />
      {new Date(date).toLocaleString("en-us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })}
    </span>
  );
};
const RecordContentDataRow = ({
  heading,
  children,
  namespace,
}: {
  heading: string;
  children: JSX.Element;
  namespace: string;
}) => {
  return (
    <div className={`${namespace}-data-row`}>
      <h4>{heading}</h4>
      <div className={`${namespace}-data-row-body`}>{children}</div>
    </div>
  );
};
const RecordContentBody = ({
  data,
  namespace,
  children,
}: {
  data: RecordSubmissionType;
  namespace: string;
  children: JSX.Element;
}) => {
  const eventOccurred =
    data.record_type === "Protests Abroad" ||
    data.record_type === "War Crimes" ||
    (data.record_type === "Russia" &&
      data.russian_record_type === "Protests in Russia")
      ? data.date_event_occurred
      : null;
  const firstPublished =
    data.record_type === "Protests Abroad" ||
    data.record_type === "War Crimes" ||
    data.record_type === "Media And Disinformation" ||
    (data.record_type === "Russia" &&
      data.russian_record_type === "Protests in Russia")
      ? data.date_first_published
      : null;
  const address =
    data.record_type === "War Crimes" ||
    (data.record_type === "Russia" &&
      data.russian_record_type === "Protests in Russia")
      ? data.address
      : null;
  const protestAbroadAddress =
    data.record_type === "Protests Abroad" ? data.address : null;
  const locationCoordinates = address
    ? `${address.latitude},${address.longitude}`
    : protestAbroadAddress
    ? `${protestAbroadAddress.latitude},${protestAbroadAddress.longitude}`
    : null;
  const locationAddress = address ? `${address.oblast},${address.city}` : null;
  return (
    <div className={`${namespace}-content-body`}>
      <div className={`${namespace}-content-body-intro-container`}>
        <RecordMediaCarousel namespace={namespace} media={data.media} />
        <div className={`${namespace}-content-body-intro-content`}>
          <h2>{data.record_title}</h2>
          <ConditionalWrapper
            condition
            wrapper={(children) => (
              <div className={`${namespace}-content-event-dates`}>
                {children}
              </div>
            )}
          >
            <>
              {firstPublished && (
                <RecordContentDate
                  namespace={namespace}
                  date={firstPublished}
                  prefix={"Reported on "}
                />
              )}
              {eventOccurred && (
                <RecordContentDate
                  namespace={namespace}
                  date={eventOccurred}
                  prefix={"Event Occurred on "}
                />
              )}
            </>
          </ConditionalWrapper>
          <p>{data.description}</p>
        </div>
      </div>
      {(locationCoordinates || locationAddress) && (
        <RecordContentDataRow heading="Location:" namespace={namespace}>
          <ul>
            {locationCoordinates && (
              <li>
                <a href={`${googleAPIRoute}${encodeURI(locationCoordinates)}`}>
                  Coordinates
                </a>
              </li>
            )}
            {locationAddress && (
              <li>
                <a href={`${googleAPIRoute}${encodeURI(locationAddress)}`}>
                  Address
                </a>
              </li>
            )}
          </ul>
        </RecordContentDataRow>
      )}

      {children}
      <RecordContentDataRow namespace={namespace} heading="Sources:">
        <ol>
          {data.evidence.map((ev) => (
            <li key={ev.url}>
              <div>{ev.description}</div>
              <div>{ev.url}</div>
            </li>
          ))}
        </ol>
      </RecordContentDataRow>
    </div>
  );
};
export default RecordContentBody;
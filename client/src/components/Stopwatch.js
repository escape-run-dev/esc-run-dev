import * as React from 'react';
import ReactStopwatch from 'react-stopwatch';
 
const Stopwatch = () => (
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    limit="01:00:00"
    onChange={({ hours, minutes, seconds }) => {
      // do something
    }}
    onCallback={() => alert('GAME OVER')}
    render={({ formatted, hours, minutes, seconds }) => {
      return (
        <section>
          <i className="fas fa-stopwatch timer"></i> <span className="timer-text">{ formatted }</span>
          {/* <p>
            Hours: { hours }
          </p>
          <p>
            Minutes: { minutes }
          </p>
          <p>
            Seconds: { seconds }
          </p> */}
        </section>
      );
    }}
   />
);
 
export default Stopwatch;

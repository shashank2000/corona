import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {format, zonedTimeToUtc} from 'date-fns-tz';
import {formatDistance} from 'date-fns';
// we don't need all these unused imports
import Table from './table';
import Level from './level';
import MapExplorer from './mapexplorer';
import TimeSeries from './timeseries';
import Minigraph from './minigraph';
import Banner from './banner';

function Home(props) {
  const [states, setStates] = useState([]);
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [graphOption, setGraphOption] = useState(1);
  const [lastUpdated, setLastUpdated] = useState('');
  const [deltas, setDeltas] = useState([]);
  const [timeseriesMode, setTimeseriesMode] = useState(true);
  const [stateHighlighted, setStateHighlighted] = useState(undefined);

  useEffect(()=> {
    if (fetched===false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [response, stateDistrictWiseResponse] = await Promise.all([axios.get('https://api.covid19india.org/data.json'), axios.get('https://api.covid19india.org/state_district_wise.json')]);
      setStates(response.data.statewise);
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setDeltas(response.data.key_values[0]);
      setStateDistrictWiseData(stateDistrictWiseResponse.data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (unformattedDate) => {
    const day = unformattedDate.slice(0, 2);
    const month = unformattedDate.slice(3, 5);
    const year = unformattedDate.slice(6, 10);
    const time = unformattedDate.slice(11);
    return `${year}-${month}-${day}T${time}+05:30`;
  };

  const onHighlightState = (state, index) => {
    if (!state && !index) setStateHighlighted(null);
    else setStateHighlighted({state, index});
  };

  return (
    <div className="Home">
      
        {fetched && (
          <MapExplorer
          lastUpdated={lastUpdated}
          states={states}
          stateDistrictWiseData={stateDistrictWiseData}
          stateHighlighted={stateHighlighted}
        />
        )}
    </div>
  );
}

export default Home;

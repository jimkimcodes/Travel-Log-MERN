import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import Popup from './Popup';
import LogEntryForm from './LogEntryForm';
import { listLogEntries, deleteLogEntry } from './api/api';
import PinDetails from './PinDetails';

const Map = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [showPinDetails, setShowPinDetails] = useState(null);
  const [pinLocation, setPinLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 11.1271,
    longitude: 78.6569,
    zoom: 6.8
  });

  let history = useHistory();

  const getLogEntries = async () => {
    const logEntries = await listLogEntries();
    if (!logEntries) {
      history.push('/login');
    }
    setLogEntries(logEntries.entries);
  }

  useEffect(() => {
    getLogEntries();
  }, []);

  const showPinLocationForm = (event) => {
    const [longitude, latitude] = event.lngLat;
    setPinLocation({
      latitude,
      longitude
    })
  }

  const closePinLocation = () => {
    if (pinLocation) {
      setPinLocation(null);
    }
    if (showPinDetails) {
      setShowPinDetails(null);
    }
  }

  return (
    <div className="wrapper">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}

        onDblClick={(event) => {
          showPinLocationForm(event);
          setShowPinDetails(null);
        }}
        onClick={closePinLocation}
      >
        {
          logEntries.map(entry => (
            <React.Fragment key={entry._id}>
              <Marker
                latitude={entry.latitude}
                longitude={entry.longitude}
              >
                <div className="marker-container"
                  style={{
                    transform: `translate(-50%, -100%)`
                  }}

                  onMouseOver={() => setShowPopup({
                    ...showPopup,
                    [entry._id]: true,
                  })}
                  onMouseOut={() => setShowPopup({})}

                  onClick={() => {
                    setShowPinDetails(entry)
                    setPinLocation(null)
                  }}
                >
                  <svg
                    style={{
                      width: `calc(0.4vmin * ${viewport.zoom})`,
                    }}
                    viewBox="0 0 46 60"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" fill="none" fillRule="evenodd"><g id="024---GPS-Location" fillRule="nonzero" transform="translate(0 -1)"><path id="Shape" d="m44.78 27.47c-1.67 13.59-16.46 28.84-20.54 32.09-.7268895.5743952-1.7531105.5743952-2.48 0-4.65-3.7-20.76-20.17-20.76-35.56-.00066293-5.8923916 2.36243227-11.5387752 6.55988257-15.67419419 4.19745033-4.13541901 9.87838873-6.41419172 15.77011743-6.32580581 13.26.2 23.07 12.31 21.45 25.47z" fill="#f44335" /><path id="Shape" d="m23.33 2c-.6 0-1.19 0-1.79.05 12.64.89 21.81 12.67 20.24 25.42-1.63 13.33-15.88 28.24-20.28 31.88l.26.21c.7268895.5743952 1.7531105.5743952 2.48 0 4.08-3.25 18.87-18.5 20.54-32.09 1.62-13.16-8.19-25.27-21.45-25.47z" fill="#c81e1e" /><circle id="Oval" cx="23" cy="24" fill="#f5f5f5" r="17" /><path id="Shape" d="m28 46h-10c-.3925078.0004965-.7484304.2305711-.9100393.5882654-.1616088.3576943-.0990164.776857.1600393 1.0717346l5 6c.189833.2152504.4629994.3385622.75.3385622s.560167-.1233118.75-.3385622l5-6c.2590557-.2948776.3216481-.7140403.1600393-1.0717346-.1616089-.3576943-.5175315-.5877689-.9100393-.5882654z" fill="#c81e1e" /><path id="Shape" d="m23 17.85c-1.2766983-1.769536-3.3180964-2.8273514-5.5-2.85-3.26 0-5.5 2.85-5.5 6.19 0 4.07 3.43 8.12 10.66 12.71.2079189.1303764.4720811.1303764.68 0 7.23-4.59 10.66-8.64 10.66-12.71 0-3.34-2.24-6.19-5.5-6.19-2.1819036.0226486-4.2233017 1.080464-5.5 2.85z" fill="#e91e63" /><g fill="#000"><path id="Shape" d="m23.35 1c-6.1603944-.09375603-12.1008533 2.28799833-16.49018669 6.61153873-4.38933341 4.32354037-6.86052671 10.22735347-6.85981331 16.38846127 0 16 16.94 33 21.14 36.35 1.0903343.8615928 2.6296657.8615928 3.72 0 3.08-2.46 19.11-18 20.92-32.75.8359747-6.7873125-1.2424071-13.6110904-5.72-18.78-4.1913147-4.88172826-10.2764787-7.72948302-16.71-7.82zm20.44 26.35c-1.58 12.82-15.54 27.74-20.17 31.43-.3634448.2871976-.8765552.2871976-1.24 0-4.04-3.22-20.38-19.55-20.38-34.78 0-11.5979797 9.4020203-21 21-21h.32c5.8672711.07888002 11.4164593 2.6804036 15.23 7.14 4.1093216 4.7333824 6.014211 10.9897082 5.24 17.21z" /><path id="Shape" d="m23 6c-9.9411255 0-18 8.0588745-18 18s8.0588745 18 18 18 18-8.0588745 18-18-8.0588745-18-18-18zm0 34c-8.836556 0-16-7.163444-16-16s7.163444-16 16-16 16 7.163444 16 16c0 4.2434638-1.6857094 8.3131264-4.6862915 11.3137085s-7.0702447 4.6862915-11.3137085 4.6862915z" /><path id="Shape" d="m28 45h-10c-.780706-.0000514-1.4900782.4541795-1.8166943 1.1632802s-.2107646 1.5434346.2966943 2.1367198l5 6c.3796661.4305009.9259988.6771243 1.5.6771243s1.1203339-.2466234 1.5-.6771243l5-6c.5030081-.5877756.6219213-1.4129342.3053422-2.1188201-.3165792-.705886-1.0118672-1.1658876-1.7853422-1.1811799zm-5 8-5-6h10z" /><path id="Shape" d="m28.5 14c-2.0681134.0053075-4.0483198.8369942-5.5 2.31-1.4516802-1.4730058-3.4318866-2.3046925-5.5-2.31-3.65 0-6.5 3.16-6.5 7.19 0 4.43 3.53 8.74 11.12 13.56.5390644.3342256 1.2209356.3342256 1.76 0 7.59-4.82 11.12-9.13 11.12-13.56 0-4.03-2.85-7.19-6.5-7.19zm-5.5 18.93c-6.82-4.36-10-8.09-10-11.74 0-3 1.93-5.19 4.5-5.19 1.8468532.0124287 3.5773792.9036867 4.66 2.4.1859338.2823456.5019353.4516321.84.45.3380647.0016321.6540662-.1676544.84-.45 1.0804486-1.4988382 2.8123527-2.3908059 4.66-2.4 2.57 0 4.5 2.23 4.5 5.19 0 3.65-3.18 7.38-10 11.74z" /></g></g></g>
                  </svg>
                </div>
              </Marker>
              {
                showPopup[entry._id] ? <Popup entry={entry} viewport={viewport} /> : null
              }
            </React.Fragment>
          ))
        }
        {
          pinLocation ? (
            <>
              <Marker
                latitude={pinLocation.latitude}
                longitude={pinLocation.longitude}
              >
                <div className="marker-container"
                  style={{
                    transform: `translate(-50%, -100%)`
                  }}
                >
                  <svg
                    style={{
                      width: `calc(0.4vmin * ${viewport.zoom})`,
                    }}
                    viewBox="0 0 46 60"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" fill="none" fillRule="evenodd"><g id="024---GPS-Location" fillRule="nonzero" transform="translate(0 -1)"><path id="Shape" d="m44.78 27.47c-1.67 13.59-16.46 28.84-20.54 32.09-.7268895.5743952-1.7531105.5743952-2.48 0-4.65-3.7-20.76-20.17-20.76-35.56-.00066293-5.8923916 2.36243227-11.5387752 6.55988257-15.67419419 4.19745033-4.13541901 9.87838873-6.41419172 15.77011743-6.32580581 13.26.2 23.07 12.31 21.45 25.47z" fill="#a63efa" /><path id="Shape" d="m23.33 2c-.6 0-1.19 0-1.79.05 12.64.89 21.81 12.67 20.24 25.42-1.63 13.33-15.88 28.24-20.28 31.88l.26.21c.7268895.5743952 1.7531105.5743952 2.48 0 4.08-3.25 18.87-18.5 20.54-32.09 1.62-13.16-8.19-25.27-21.45-25.47z" fill="#c81e1e" /><circle id="Oval" cx="23" cy="24" fill="#f5f5f5" r="17" /><path id="Shape" d="m28 46h-10c-.3925078.0004965-.7484304.2305711-.9100393.5882654-.1616088.3576943-.0990164.776857.1600393 1.0717346l5 6c.189833.2152504.4629994.3385622.75.3385622s.560167-.1233118.75-.3385622l5-6c.2590557-.2948776.3216481-.7140403.1600393-1.0717346-.1616089-.3576943-.5175315-.5877689-.9100393-.5882654z" fill="#c81e1e" /><path id="Shape" d="m23 17.85c-1.2766983-1.769536-3.3180964-2.8273514-5.5-2.85-3.26 0-5.5 2.85-5.5 6.19 0 4.07 3.43 8.12 10.66 12.71.2079189.1303764.4720811.1303764.68 0 7.23-4.59 10.66-8.64 10.66-12.71 0-3.34-2.24-6.19-5.5-6.19-2.1819036.0226486-4.2233017 1.080464-5.5 2.85z" fill="#e91e63" /><g fill="#000"><path id="Shape" d="m23.35 1c-6.1603944-.09375603-12.1008533 2.28799833-16.49018669 6.61153873-4.38933341 4.32354037-6.86052671 10.22735347-6.85981331 16.38846127 0 16 16.94 33 21.14 36.35 1.0903343.8615928 2.6296657.8615928 3.72 0 3.08-2.46 19.11-18 20.92-32.75.8359747-6.7873125-1.2424071-13.6110904-5.72-18.78-4.1913147-4.88172826-10.2764787-7.72948302-16.71-7.82zm20.44 26.35c-1.58 12.82-15.54 27.74-20.17 31.43-.3634448.2871976-.8765552.2871976-1.24 0-4.04-3.22-20.38-19.55-20.38-34.78 0-11.5979797 9.4020203-21 21-21h.32c5.8672711.07888002 11.4164593 2.6804036 15.23 7.14 4.1093216 4.7333824 6.014211 10.9897082 5.24 17.21z" /><path id="Shape" d="m23 6c-9.9411255 0-18 8.0588745-18 18s8.0588745 18 18 18 18-8.0588745 18-18-8.0588745-18-18-18zm0 34c-8.836556 0-16-7.163444-16-16s7.163444-16 16-16 16 7.163444 16 16c0 4.2434638-1.6857094 8.3131264-4.6862915 11.3137085s-7.0702447 4.6862915-11.3137085 4.6862915z" /><path id="Shape" d="m28 45h-10c-.780706-.0000514-1.4900782.4541795-1.8166943 1.1632802s-.2107646 1.5434346.2966943 2.1367198l5 6c.3796661.4305009.9259988.6771243 1.5.6771243s1.1203339-.2466234 1.5-.6771243l5-6c.5030081-.5877756.6219213-1.4129342.3053422-2.1188201-.3165792-.705886-1.0118672-1.1658876-1.7853422-1.1811799zm-5 8-5-6h10z" /><path id="Shape" d="m28.5 14c-2.0681134.0053075-4.0483198.8369942-5.5 2.31-1.4516802-1.4730058-3.4318866-2.3046925-5.5-2.31-3.65 0-6.5 3.16-6.5 7.19 0 4.43 3.53 8.74 11.12 13.56.5390644.3342256 1.2209356.3342256 1.76 0 7.59-4.82 11.12-9.13 11.12-13.56 0-4.03-2.85-7.19-6.5-7.19zm-5.5 18.93c-6.82-4.36-10-8.09-10-11.74 0-3 1.93-5.19 4.5-5.19 1.8468532.0124287 3.5773792.9036867 4.66 2.4.1859338.2823456.5019353.4516321.84.45.3380647.0016321.6540662-.1676544.84-.45 1.0804486-1.4988382 2.8123527-2.3908059 4.66-2.4 2.57 0 4.5 2.23 4.5 5.19 0 3.65-3.18 7.38-10 11.74z" /></g></g></g>
                  </svg>
                </div>
              </Marker>
              <Popup
                entry={{ ...pinLocation, title: "Add a memory to this location!" }}
                viewport={viewport}
              />
            </>
          ) : null
        }
      </ReactMapGL>
      <div className={"columns is-centered bottom-container " + (pinLocation ? "show" : "") } >
        <div className="column mx-6">
          {
            pinLocation ? (
              <LogEntryForm
                onClose={ async ()=>{ 
                  setPinLocation(null);
                  await getLogEntries();
                }} 
                location={pinLocation} 
              />
            ): null
          }
        </div>
      </div>

      <div className={"columns is-centered pin-detail bottom-container " + (showPinDetails ? "show" : "") } >
        <div className="column mx-6 is-four-fifths-mobile is-two-thirds">
          {
            showPinDetails ? (
              <PinDetails
                entry={showPinDetails} 
                deleteHandler = { async (id)=> {await deleteLogEntry(id); closePinLocation(); await getLogEntries();} }
              />
            ) : null
          }
        </div>
      </div>
    </div>
  );
}

export default Map;
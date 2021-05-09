
const DISTANCE_LIMIT=100; //Max distance limit services within 100KM radius will be shown
const WEIGHT_DISTANCE=50; 
const WEIGHT_REVIEW=50;
const WEIGHT_TOTAL=100;


module.exports=(payload,services)=>{
    return genDataFromResult(payload,services);
}


function genDataFromResult(payload,services=[])
{
    return services.map(element => score(payload, element)).sort((b,a)=>a.score-b.score);

}

function score(payload,service)
{
    const { address } = service;
    //Score with distance
    const distance = calcdistance(
      payload.lat,
      payload.lon,
      address.lat,
      address.lon
    );
    service.distance=distance;
    let pVotes=0;
    service.votes.forEach(element => {
        if(element)
            pVotes++;
    });
    const votePercent =
      (service.votes.length > 0 ? pVotes / service.votes.length : 0) *
      WEIGHT_REVIEW;
    const distPercent=(1-(distance/DISTANCE_LIMIT))*WEIGHT_DISTANCE;
    service.score= votePercent+distPercent;
    return service;
}
function calcdistance(lat1, lon1, lat2, lon2, unit="K") {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

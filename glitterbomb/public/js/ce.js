const axios = window.axios;

// Platform server host.
const host = "http://localhost:3000";
// Analytics endpoint
const analyticsUrl = "/api/analytics/";
// Traffic url to fetch variant
const trafficUrl = '/api/traffic/';

let ce = {

  getExperiment: function(){

    return axios({
      method: 'post',
      baseURL: host,
      url: trafficUrl,
      json: true,
      data: {"experiment_id" : experimentId}
    })
  },


  eventTracker: function (eventType, experimentId, variant, trackerId, args){
    //If cookie has not been set do not send.
    if (!experimentId || !variant || !trackerId ) {
      console.error(`experiment is not setup correctly! CE client will not push to server.`)
    } else{
      //Send analytics about user that has seen page.
      const method = "post";
      let address = "";
      let name = "";
      let color = "";

      if(args) {
        name = args[0].value;
        address = args[1].value;
        color = args[2].value;
      }

      const data =  {
        trackingID: trackerId,
        variant: variant,
        experimentID: experimentId,
        eventType: eventType,
        address: address,
        name: name,
        color: color,
      };
      console.log(`sending page stats for eventType: ${eventType} see data below: `, data);
      ce.send(method, analyticsUrl, data)
    }

  },

  send: function send(method, url, data, headers, cb) {

    if(!headers) {
      headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
      axios({
        baseURL: host,
        method: method,
        headers: headers,
        url: url,
        data: data
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.error(err.message);
      });
    }

};




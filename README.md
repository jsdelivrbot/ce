# Conscious Experiment Platform

Designed for simple a/b testing, CE can drive you to success.  Using our client, ce.js, you can track pageviews, a/b stats and conversions.


### Quick Start

1. ```> docker-compose up //starts plaform``` 
2. ```> cd glitterbomb```
3. ```> node index.js // starts client ( will call CE platform )```
4. Navigate to http://localhost:3000/  to see the platform configuration panel
5. Navigate to http://localhost:8000/glitterbomb to see the client. 
6. Create an experiment in the the configuration panel, adding two variants.
7. Update the glitterbomb.html file with the experimentId and two variant names. 
8. Refresh your client page at http://localhost:8000/glitterbomb to see which experiment you're in. 
9. Submit form to count as conversions.
10. Delete all cookies, refresh page.
11. You may or may not get another variant.
12. To see analytics:  Go back to platform config panel http://localhost:3000/  and select the link found in the analytics column for your experiment.

**Note**:  The variant ( split ) is at random, this project is to do demonstrate how experiments can be developed through a platform.  There are many npm libraries that allow you do a split based on the actual weight provided in the platform panel. 


## CE Platform

http://localhost:8000/

1. Add experiment with group A and B names along with their 
	
## CE Client Library

Using the client, run the experiment by providing the experimentId and the group names at the top of your client-side script.

### Provide experiment and Variant Names
```javascript
<script src="./js/ce.js"></script>

const experimentId = "5be1ff59a9fa2c8f6d2cd879";  
const variantA = 'With Herpes Copy"';  
const variant = 'WIthout Herpes Copy';
```

###  window.load() Scripting
```javascript
//On window.load() set your cookie
if(!experimentCookieExists()) {  
  
  ce.getExperiment()  
    .then((experiment) => {  
  
      const trackerId = experiment.data.trackerId;  
  const variant = experiment.data.variant;  
  
  if(experiment.statusCode === 404){  
        console.log('sorry this experiment has not been set up. check your experimentId in the ce.js client.')  
      } else {  
  
        //update dom based on variant  
  domChangeBasedOnVariant(variant);  
  
  //set cookies  
  setExperimentCookies(variant, trackerId);  
  
  //Send pageview analytic event information  
  ce.eventTracker('pageview', experimentId, variant, trackerId);  
  
  }})  
    .then((variant) => {console.log(`Updated user experience to variant ${variant}`)})  
    .catch((err) => {console.error(err.message);});  
}

//Check if an experiment cookie does not exist
function experimentCookieExists(){  
  let cookieExists = window.Cookies.get('experiment');  
  if(typeof(cookieExists) === 'undefined') {  
    return false;  
  }  else {  
    return true;  
  }
  
```
###  Change Dom
```javascript
//toggle our copy based on variant  
  if(variant === variantA){  
    $('#glitter_message').text('Glitter is the herpes of the crafting world.');  
  
  } else if(variant === variantB){  
    $('#glitter_message').text('Broken glass. It’s just like glitter.');  
  }  
}
```



# Screenshots

### Platform Config Panel


<img src="https://duaw26jehqd4r.cloudfront.net/items/3u1h1C222z0i1b2M3Z1F/Image%202018-11-07%20at%207.39.46%20PM.png?v=4b529cfe">


### Analytics 

<img src="https://duaw26jehqd4r.cloudfront.net/items/3p2T1S0q2u333P1B3h3L/Image%202018-11-08%20at%2012.49.25%20PM.png?v=239fcc1e">
 
### Client Page

<img src="https://duaw26jehqd4r.cloudfront.net/items/0g1t0H1i2G0M1c1m3U0W/Image%202018-11-08%20at%2012.52.15%20PM.png?v=8b359ed1">
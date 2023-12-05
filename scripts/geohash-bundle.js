(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self)["geofire-common"]={})}(this,(function(t){"use strict";var e="0123456789bcdefghjkmnpqrstuvwxyz",n=40007860,r=110574,o=6378137,a=.00669447819799;function i(t){return Math.log(t)/Math.log(2)}function h(t){var e;if(Array.isArray(t))if(2!==t.length)e="expected array of length 2, got length "+t.length;else{var n=t[0],r=t[1];"number"!=typeof n||isNaN(n)?e="latitude must be a number":n<-90||n>90?e="latitude must be within the range [-90, 90]":"number"!=typeof r||isNaN(r)?e="longitude must be a number":(r<-180||r>180)&&(e="longitude must be within the range [-180, 180]")}else e="location must be an array";if(void 0!==e)throw new Error("Invalid GeoFire location '"+t+"': "+e)}function u(t){var n;if("string"!=typeof t)n="geohash must be a string";else if(0===t.length)n="geohash cannot be the empty string";else for(var r=0,o=t;r<o.length;r++){var a=o[r];-1===e.indexOf(a)&&(n="geohash cannot contain '"+a+"'")}if(void 0!==n)throw new Error("Invalid GeoFire geohash '"+t+"': "+n)}function s(t){if("number"!=typeof t||isNaN(t))throw new Error("Error: degrees must be a number");return t*Math.PI/180}function f(t,n){if(void 0===n&&(n=10),h(t),void 0!==n){if("number"!=typeof n||isNaN(n))throw new Error("precision must be a number");if(n<=0)throw new Error("precision must be greater than 0");if(n>22)throw new Error("precision cannot be greater than 22");if(Math.round(n)!==n)throw new Error("precision must be an integer")}for(var r={min:-90,max:90},o={min:-180,max:180},a="",i=0,u=0,s=1;a.length<n;){var f=s?t[1]:t[0],c=s?o:r,g=(c.min+c.max)/2;f>g?(i=1+(i<<1),c.min=g):(i=0+(i<<1),c.max=g),s=!s,u<4?u++:(u=0,a+=e[i],i=0)}return a}function c(t,e){var n=s(e),r=Math.cos(n)*o*Math.PI/180*(1/Math.sqrt(1-a*Math.sin(n)*Math.sin(n)));return r<1e-12?t>0?360:0:Math.min(360,t/r)}function g(t,e){var n=c(t,e);return Math.abs(n)>1e-6?Math.max(1,i(360/n)):1}function l(t){return Math.min(i(20003930/t),110)}function m(t){if(t<=180&&t>=-180)return t;var e=t+180;return e>0?e%360-180:180- -e%360}function d(t,e){var n=e/r,o=Math.min(90,t[0]+n),a=Math.max(-90,t[0]-n),i=2*Math.floor(l(e)),h=2*Math.floor(g(e,o))-1,u=2*Math.floor(g(e,a))-1;return Math.min(i,h,u,110)}function M(t,e){var n=e/r,o=Math.min(90,t[0]+n),a=Math.max(-90,t[0]-n),i=c(e,o),h=c(e,a),u=Math.max(i,h);return[[t[0],t[1]],[t[0],m(t[1]-u)],[t[0],m(t[1]+u)],[o,t[1]],[o,m(t[1]-u)],[o,m(t[1]+u)],[a,t[1]],[a,m(t[1]-u)],[a,m(t[1]+u)]]}function b(t,n){u(t);var r=Math.ceil(n/5);if(t.length<r)return[t,t+"~"];var o=(t=t.substring(0,r)).substring(0,t.length-1),a=e.indexOf(t.charAt(t.length-1)),i=5-(n-5*o.length),h=a>>i<<i,s=h+(1<<i);return s>31?[o+e[h],o+"~"]:[o+e[h],o+e[s]]}t.BASE32=e,t.BITS_PER_CHAR=5,t.E2=a,t.EARTH_EQ_RADIUS=o,t.EARTH_MERI_CIRCUMFERENCE=n,t.EPSILON=1e-12,t.GEOHASH_PRECISION=10,t.MAXIMUM_BITS_PRECISION=110,t.METERS_PER_DEGREE_LATITUDE=r,t.boundingBoxBits=d,t.boundingBoxCoordinates=M,t.degreesToRadians=s,t.distanceBetween=function(t,e){h(t),h(e);var n=s(e[0]-t[0]),r=s(e[1]-t[1]),o=Math.sin(n/2)*Math.sin(n/2)+Math.cos(s(t[0]))*Math.cos(s(e[0]))*Math.sin(r/2)*Math.sin(r/2);return 6371*(2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))},t.geohashForLocation=f,t.geohashQuery=b,t.geohashQueryBounds=function(t,e){h(t);var n=Math.max(1,d(t,e)),r=Math.ceil(n/5),o=M(t,e).map((function(t){return b(f(t,r),n)}));return o.filter((function(t,e){return!o.some((function(n,r){return e>r&&t[0]===n[0]&&t[1]===n[1]}))}))},t.latitudeBitsForResolution=l,t.longitudeBitsForResolution=g,t.metersToLongitudeDegrees=c,t.validateGeohash=u,t.validateKey=function(t){var e;if("string"!=typeof t?e="key must be a string":0===t.length?e="key cannot be the empty string":11+t.length>755?e="key is too long to be stored in Firebase":/[\[\].#$\/\u0000-\u001F\u007F]/.test(t)&&(e="key cannot contain any of the following characters: . # $ ] [ /"),void 0!==e)throw new Error("Invalid GeoFire key '"+t+"': "+e)},t.validateLocation=h,t.wrapLongitude=m,Object.defineProperty(t,"__esModule",{value:!0})}));

},{}],2:[function(require,module,exports){
const geofire = require("geofire-common");
// const lat = 51.5074;
// const lng = 0.1278;
// const hash = geofire.geohashForLocation([lat, lng]);
// console.log(hash);
function testGeo() {
  // Compute the GeoHash for a lat/lng point
  const lat = 51.5074;
  const lng = 0.1278;
  const hash = geofire.geohashForLocation([lat, lng]);
  console.log(hash);

  // Add the hash and the lat/lng to the document. We will use the hash
  // for queries and the lat/lng for distance comparisons.
  const londonRef = db.collection("testing").doc("test1");
  londonRef
    .update({
      geohash: hash,
      lat: lat,
      lng: lng,
    })
    .then(() => {
      // ...
    });
}

async function addGeoHashToAllVendors() {
  let counter = 0;
  const allVendors = await db.collection("vendors").get();
  allVendors.forEach((doc) => {
    const { lat, lng } = doc.data();
    try {
      const hash = geofire.geohashForLocation([lat, lng]);
      console.log(hash);
      doc.ref.update({
        geohash: hash,
      });
    } catch (e) {
      console.log(`vendor ID: ${doc.id}`);
      console.log(e);
    }
  });
}

async function getVendorsInRadius(center, radiusKm) {
  // Find cities within 50km of London
  // const center = [51.5074, 0.1278];

  const radiusInM = radiusKm * 1000;

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = db
      .collection("vendors")
      .orderBy("geohash")
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }

  // Collect all the query results together into a single list
  return await Promise.all(promises).then((snapshots) => {
    const matchingDocs = [];

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.get("lat");
        const lng = doc.get("lng");

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = geofire.distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }

    return matchingDocs;
  });
}

async function testQuery() {
  const center = [49.30989932948749, -123.0823846562677];
  const results = await getVendorsInRadius(center, 10);
  results.forEach((doc) => {
    console.log(doc.data());
  });
}
// window.testGeoGlobal = testGeo;
// window.addHash = addGeoHashToAllVendors;
// window.testHash = testQuery;
window.getVendorsInRadius = getVendorsInRadius;

},{"geofire-common":1}]},{},[2]);

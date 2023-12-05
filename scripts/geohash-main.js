/**
 * @fileoverview
 * - Uses Firestore GeoFire library to query firestore based on given radius by using GeoHashing
 */

const geofire = require("geofire-common");
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

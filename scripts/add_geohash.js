// console.log(geofire.geohashForLocation([1232, 12323]));
async function testTransaction() {
  await db.collection("testing").doc("test1").set({ test: "testing" });
  let testDocRef = db.collection("testing").doc("test1");
  return db.runTransaction((transaction) => {
    // This code may get re-run multiple times if there are conflicts.
    return transaction.get(testDocRef).then((testDoc) => {
      if (!testDoc.exists) {
        throw "Document does not exist!";
      }

      // Add one person to the city population.
      // Note: this could be done without a transaction
      //       by updating the population using FieldValue.increment()
      // var newPopulation = testDoc.data().population + 1;
      transaction.update(testDocRef, { population: "Test Succeeded" });
    });
  });
}

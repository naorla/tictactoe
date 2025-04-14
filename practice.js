let computerchoose=1;  // No need to initialize to -1, just declare it
let steps=[1,2,3,4,5,6,7,8]
while (steps.includes(computerchoose)) {
  // Generate a random number between 0 and 9
  computerchoose = Math.floor(Math.random() * 10);
}

console.log("Chosen number: " + computerchoose);  // Will print a number not in `steps`

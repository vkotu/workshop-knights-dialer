export default {
	reachableKeys,
	countPaths,
	listAcyclicPaths
};

var dialPad = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[ ,0, ]
]

var nearByKeys = [
	[4,6],
	[6,8],
	[7,9],
	[4,8],
	[3,9,0],
	[],
	[1,7,0],
	[2,6],
	[1,3],
	[2,4]
]
// ****************************

function reachableKeys(startingDigit) {

	return nearByKeys[startingDigit];
	// var nearByKeys = [];
	// for(let [rowIdx, row] of dialPad.entries()) {
	// 	let colIdx = row.indexOf(startingDigit);
	// 	if(colIdx != -1) {
	// 		for(let rowMove of [-2,-1,1,2]) {
	// 			for(let colMove of [-2,-1,1,2]){
	// 				if(Math.abs(rowMove) != Math.abs(colMove)){
	// 					if(
	// 						rowIdx+rowMove >=0 &&
	// 						rowIdx+rowMove <=3 &&
	// 						colIdx+colMove <=2 &&
	// 						dialPad[rowIdx+rowMove][colIdx+colMove] != undefined
	// 					) {
	// 						nearByKeys.push(
	// 							dialPad[rowIdx+rowMove][colIdx+colMove]
	// 						);
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// return nearByKeys;
}

function countPaths(startingDigit,hopCount) {
	if(hopCount == 0) {
		return 1;
	}
	var pathCount = 0;
	for(let digit of nearByKeys[startingDigit]) {
		pathCount += countPaths(digit, hopCount-1);
	}
	return pathCount;
}

function listAcyclicPaths(startingDigit) {
	var paths = [];
	var nextHops = nearByKeys[startingDigit];

	for(let nextHop of nextHops) {
		let path = [startingDigit, nextHop];
		followPath(path, paths);
	}
	return paths;
}

function followPath(path, paths) {
	var nextHops = nearByKeys[path[path.length-1]];
	var pathForwardFound = false;
	for(let nextHop of nextHops) {
		if(!path.includes(nextHop)) {

				pathForwardFound = true;
				let nextPath = [...path, nextHop];
				followPath(nextPath, paths);
		}
	}

	if(!pathForwardFound) {
		paths.push(path);
	}
}

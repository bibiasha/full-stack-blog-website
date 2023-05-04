let student =[
    {name:"Smith",rollNumber:31,marks:80},
    {name:"Jenny",rollNumber:15,marks:69},
    {name:"John",rollNumber:16,marks:35},
    {name:"Tiger",rollNumber:7,marks:55}
   ];
   //find the students whose marks is gretar than 60 and roll number greater than 15
   let filter=student.filter((x)=>x.rollNumber<60 && x.rollNumber>15 )

   console.log(filter)
// let a=10;
// console.log("Start ")
// setTimeout(() => {
//   console.log("Timeout")
// },10)

// function sleep() {
//     return new Promise(res => {
//         console.log("Promises")
//     });
// }
// console.log("End")
// sleep()

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

 

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]


function indicesOfSum(array, target){
let output =[];
// let i=0;
// let j=array.length-1;
// while(i>j){
//     if(array[i]+array[j]==target){
//          output.push([i])
//          output.push([j])
//     }else if(array[i]+array[j]>target){
//         j--
//         i++
//     }else if(array[i]+array[j]<target){
//         i++
//         j--
//     }
// }
for(let i=0;i<array.length;i++){
    for(let j=i+1;j<array.length;j++){
        if(array[i]+array[j]==target){
                     output.push([i])
                     output.push([j])
                }
    }
}
return output
}

console.log(indicesOfSum([3,2,4], 6))

// let path= req.params.userId
// useEffect()
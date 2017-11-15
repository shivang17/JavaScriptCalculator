(function() 

{
  "use strict";

    //get elements
    var el = function(element) 
    //if passed an ID
    {
    if (element.charAt(0) === "#") 
    {                                                                               
      return document.querySelector(element);                                       
    }
    //returns single element
    return document.querySelectorAll(element);                                   
  };

  // All Variables
  var viewer = el("#viewer"), //display                                                       
    equals = el("#equals"),   //for = button                                                     
    nums = el(".num"),        //List of numbers                                                      
    ops = el(".ops"),         //list of operators                                     
    theNum = "",              //current Number                                                               
    oldNum = "",              //First Number                                                      
    resultNum,                //result                                       
    operator;                 //work on operators


//Get the clicked number
                                                                                    
  var setNum = function() 
  {
    if (resultNum) 
    //if number was displayed, reset the number
    {                                                                               
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else
      //else add digit to previous number 
    {                                                                       
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum;  //display current number                                                      

  };

  //when operator is clicked, pass number to first number(OldNum) and save operator                                                                            
  var moveNum = function() 
  {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", "");     //reset result                                    
 
  };

   //calculate result when equals is clicked                                                                               
  var displayNum = function() {

  //convert string input to numbers                                        
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    //perfrom the operations                                                                                
    switch (operator) 
    {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        break;

      //if equal is pressed without any operator, keep number and continue                                                                         
      default:
        resultNum = theNum;
    }

    //if NaN or infinity is returned
                                                                              
    if (!isFinite(resultNum)) 
    {// if result is not a number, set off.
      if (isNaN(resultNum)) 
      {                                                                     
        resultNum = "You made a blunder!";
      } else 
      { //If result is infinity, set off by dividing by zero                                                                
        resultNum = "Oh shit!!Bye Bye";

        el('#calculator').classList.add("broken"); //break calculator                             
        el('#reset').classList.add("show");        // show reset button         
      }
    }

    //Start displaying result                                                                  

    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Reset oldNum & keep result

    oldNum = 0;
    theNum = resultNum;

  };

  // When: Clear button is pressed. Clear everything
  var clearAll = function() 
  {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };



  // Add click event to numbers

  for (var i = 0; i < nums.length; i++) 
  {
    nums[i].onclick = setNum;
  }

  // Add click event to operators

  for (var i = 0;  i < ops.length; i++) 
  {

  ops[i].onclick = moveNum;

  }

                                                                                      
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearAll;

   el("#reset").onclick = function() {
     window.location = window.location;
   };

}());
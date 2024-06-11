

let connectorSelectorBoxes = document.getElementsByName("connector_selector_radio_group");
let connectorBubbles = document.getElementsByClassName("connector_bubble");
let bubbleContainers = document.getElementsByClassName("main_bubble_container");
let activeBubbleConnectorSL;

const connectorCountButtons = document.getElementsByClassName("connector_count_button");
const addText = "Add";
const removeText = "Remove";

// const AllPadlockButtons = document.querySelectorAll("[data-padlock]");
// const AllpadLockSVG = document.querySelectorAll("[data-padlock-svg]");
const AllLengthWrappers = document.querySelectorAll("[data-number-wrapper]");
// let ActivePadlock = "total";

let connectorCellInsertBtn = document.querySelectorAll("[data-cell-insert]");

let Bconfig = 0;

const AllLengthNumbers = document.querySelectorAll("[data-input]");
const totalLength = document.querySelector("[data-input=total]");
const inputLength = document.querySelector("[data-input=input]");
const outputLength = document.querySelector("[data-input=output]");
const centerLength = document.querySelector("[data-input=center]");

let allLenghtChangeBTNs = document.querySelectorAll("[data-length_change]");

let CableMaxLength = 120;
let segmentMinLength = 3;


let YsegmentMinLength = segmentMinLength;
let YsegmentMaxLength = CableMaxLength - YsegmentMinLength;

let totalMinLength = 0;

let segmentMaxLength = 0;

let currentTotalLength = 0;

for(selectBox of connectorSelectorBoxes){ //loop through all the select boxes and give the current box in the loop the name "selectBox"
    selectBox.addEventListener("change", function(e){//add an event listener for each select box
        for(bubble of connectorBubbles){ //loopt through all bubbles and give the current bublle in the loop the name "bubble"
            bubble.classList.remove("connector_bubble_active"); // remove the active class for each bubble
        };
        // selectedBubble = document.getElementById(e.target.value);//find the matching select box and bubble by using the select box value and the bubble ID
        selectedBubble = document.querySelector(`[data-bubble=${e.target.getAttribute("data-selector")}]`);
        selectedBubble.classList.add("connector_bubble_active");// add the active class
    });
}

for(selectBubble of connectorBubbles){
    selectBubble.addEventListener("click", function(e){
        for(bubble of connectorBubbles){
            bubble.classList.remove("connector_bubble_active");
        };
        selectedBox = document.querySelector(`[data-selector=${e.currentTarget.getAttribute("data-bubble")}]`);
        selectedBox.checked = true;
        e.currentTarget.classList.add("connector_bubble_active");
    });
}


for(countBtn of connectorCountButtons){
    countBtn.addEventListener("click", function(e){
        let currentCountBtnID = e.currentTarget.getAttribute("data-count_connector");
        const segment = currentCountBtnID.split("_");
        let countTextbox = document.querySelector(`[data-connector_count-text=${currentCountBtnID}]`);
        let selectorbox = document.querySelector(`[data-selector=${currentCountBtnID}]`)
        let selectorContainer = document.querySelector(`[data-selector-container=${currentCountBtnID}]`);
        let leftBubblebox = document.querySelector(`[data-bubble=${segment[0]}_a]`);
        let leftBubbleContainer = document.querySelector(`[data-bubble-container=${segment[0]}_a]`);
        let rightBubblebox = document.querySelector(`[data-bubble=${segment[0]}_b]`);
        let rightBubbleContainer = document.querySelector(`[data-bubble-container=${segment[0]}_b]`);

        let bubbleImageElement = document.querySelector(`[data-bubble-image=${currentCountBtnID}]`);
        let bubbleTextElement = document.querySelector(`[data-bubble-text=${currentCountBtnID}]`);
        let bubbleDetailElement = document.querySelector(`[data-bubble-detail=${currentCountBtnID}]`);

        if(countTextbox.innerHTML == addText){
            countTextbox.innerHTML = removeText;
            console.log(selectorbox);
            selectorbox.checked = true;
            for(bubble of connectorBubbles){ //loopt through all bubbles and give the current bublle in the loop the name "bubble"
                bubble.classList.remove("connector_bubble_active"); // remove the active class for each bubble
            };
            rightBubblebox.classList.add("connector_bubble_active");

            if(segment[0] == "output"){
                Bconfig++;
            }
            else if(segment[0] == "input"){
                Bconfig++;
            }
        }
        else if(countTextbox.innerHTML == removeText){
            countTextbox.innerHTML = addText;
            let newSelectorbox = document.querySelector(`[data-selector=${segment[0]}_a]`);
            newSelectorbox.checked = true;
            for(bubble of connectorBubbles){ //loopt through all bubbles and give the current bublle in the loop the name "bubble"
            bubble.classList.remove("connector_bubble_active"); // remove the active class for each bubble
            };
            leftBubblebox.classList.add("connector_bubble_active");

            if(segment[0] == "output"){
                Bconfig--;
            }
            else if(segment[0] == "input"){
                Bconfig--;
            }
        }
        console.log("Segment = " + segment[0]);
        console.log("B Config = " + Bconfig);
        selectorContainer.classList.toggle("flex_hide");     
        rightBubbleContainer.classList.toggle("move_right_io");
        leftBubbleContainer.classList.toggle("move_left_io");
        
        bubbleImageElement.src = "";
        bubbleTextElement.innerHTML = "";
        bubbleTextElement.classList.add("hidden");
        bubbleDetailElement.getAttribute("data-bubble-connectorid").value = "";
        bubbleDetailElement.classList.add("hidden");

        const lengthOutputRow = document.querySelector("[data-length-row=output]");
        const lengthCenterRow = document.querySelector("[data-length-row=center]");
        const lengthInputRow = document.querySelector("[data-length-row=input]");
        // const totalPadlockBTN = document.querySelector("[data-padlock=total]");
        // const totalPadlockSVG = document.querySelector("[data-padlock-svg=total");
        // const totalNumberWrapper = document.querySelector("[data-number-wrapper=total]");

        // const YRatioRow = document.querySelector("[data-radio-row=Y]");
        // const XRatioRow = document.querySelector("[data-radio-row=X]");

        switch(Bconfig){
            case 0: //Straight Cable (B0)
            totalLength.parentNode.parentNode.classList.remove("disable");
                // totalPadlockBTN.classList.add("flex_hide");
                lengthOutputRow.classList.add("flex_hide");
                lengthCenterRow.classList.add("flex_hide");
                lengthInputRow.classList.add("flex_hide");
                // removeActivePadlocks();
                // totalPadlockSVG.classList.add("active");
                // totalNumberWrapper.classList.add("active");
                // YRatioRow.classList.add("flex_hide");
                break;
            case 1: //Y Cable (B1)
                totalLength.parentNode.parentNode.classList.add("disable");
                // totalPadlockBTN.classList.remove("flex_hide");
                lengthOutputRow.classList.remove("flex_hide");
                lengthInputRow.classList.remove("flex_hide");
                lengthCenterRow.classList.add("flex_hide");
                // YRatioRow.classList.remove("flex_hide");
                // XRatioRow.classList.add("flex_hide");
                // if(ActivePadlock=="center"){
                //     removeActivePadlocks();
                //     totalPadlockSVG.classList.add("active");
                //     totalNumberWrapper.classList.add("active");
                // }
                SplitTotal();
                break;
            case 2: //X Cable (B2)
                totalLength.parentNode.parentNode.classList.add("disable");
                // totalPadlockBTN.classList.remove("flex_hide");
                lengthOutputRow.classList.remove("flex_hide");
                lengthInputRow.classList.remove("flex_hide");
                lengthCenterRow.classList.remove("flex_hide");
                // XRatioRow.classList.remove("flex_hide");
                // YRatioRow.classList.add("flex_hide");
                SplitTotal();
                break;
        }
    });
};


for(eachCellInsertBtn of connectorCellInsertBtn){
    let currentActiveBubble;
    eachCellInsertBtn.addEventListener("click", function(e){
        for(eachBubble of connectorBubbles){
            if(eachBubble.classList.contains("connector_bubble_active")){
                currentActiveBubble = eachBubble;
                break;
            };
        }
        console.log(currentActiveBubble);
        activeBubbleConnectorSL = currentActiveBubble.getAttribute("data-bubble");
        console.log(activeBubbleConnectorSL);
        let bubbleSegment = activeBubbleConnectorSL.split("_");
        let cellID = e.target.getAttribute("data-cell-insert");

        let bubbleImageElement = document.querySelector(`[data-bubble-image=${activeBubbleConnectorSL}]`);
        let bubbleTextElement = document.querySelector(`[data-bubble-text=${activeBubbleConnectorSL}]`);
        let bubbleDetailElement = document.querySelector(`[data-bubble-detail=${activeBubbleConnectorSL}]`);
        console.log(`[data-bubble-text=${activeBubbleConnectorSL}]`);
        let cellImageElement = document.querySelector(`[data-cell-image=${cellID}]`);
        let cellValues = document.querySelectorAll(`[data-cell-cid=${cellID}`);
        let cellValueName = cellValues[1].getAttributeNode("value").value;
        let cellValueSize = cellValues[2].getAttributeNode("value").value;

        bubbleImageElement.src = cellImageElement.src;
        console.log(bubbleTextElement);
        bubbleTextElement.innerHTML = cellValueName + ", " + cellValueSize;
        bubbleTextElement.classList.remove("hidden");
        bubbleDetailElement.classList.remove("hidden");

    });
};


// for(eachPadlockBtn of AllPadlockButtons){
//     eachPadlockBtn.addEventListener("click",function(e){
//         const btnClicked = e.currentTarget;
//         const btnPadlock = btnClicked.querySelector("[data-padlock-svg]");
//         const rowParent = btnClicked.parentNode;
//         const number = rowParent.querySelector("[data-number-wrapper]");
//         console.log(rowParent);
//         removeActivePadlocks();
//         btnPadlock.classList.add("active");
//         number.classList.add("active");
//         ActivePadlock=btnPadlock.getAttribute("data-padlock-svg");
//         console.log(ActivePadlock);
//     });
// }
// function removeActivePadlocks(){
//     for(eachPadlockSVG of AllpadLockSVG){
//         eachPadlockSVG.classList.remove("active");
//     }
//     for(eachlengthNumber of AllLengthWrappers){
//         eachlengthNumber.classList.remove("active");
//     }
// }

function InchToFeet(inch){
    let raw = inch/12;
    return CustomRound(raw,0.001);
}

function InchToMeter(inch){
    let raw = inch/39.37;
    return CustomRound(raw,0.0001);
}

function UpdateAltLengths(numberInputTarget){
    let altFeetElement = numberInputTarget.parentNode.parentNode.parentNode.querySelector("[data-alt_length-feet]");
    let altMeterElement = numberInputTarget.parentNode.parentNode.parentNode.querySelector("[data-alt_length-meters]");
    altFeetElement.innerHTML = InchToFeet(numberInputTarget.value);
    altMeterElement.innerHTML = InchToMeter(numberInputTarget.value);
}

function CustomRound(value, steps){
    steps || (steps = 1);
    var inv = 1.0 / steps;
    return Math.round(value * inv)/inv;
}

function ChangeLength(TARGET){ //TARGET = "length number" element, BUTTON = the button element that was pressed
    let wasBtnClicked = false;
    let lengthChangeAmount = 0;
    let sectiontarget = TARGET.getAttribute("data-input");
    let BUTTON = "none";
    if (arguments.length >= 2){
        wasBtnClicked = true;
        BUTTON = arguments[1];
    }
    else  {wasBtnClicked = false;};
    switch(Bconfig){
        case 0: //Straight Cable (B0)
            totalMinLength = segmentMinLength;
            TARGET.value = CustomRound(TARGET.value, 1);
            if (wasBtnClicked == true){
                if(lengthChangeDirection == "increment"){ 
                        TARGET.value= Number(TARGET.value)+lengthChangeAmount;
                    }                
                else if(lengthChangeDirection == "decrement"){
                        TARGET.value= Number(TARGET.value)-lengthChangeAmount;
                }
            };
            CorrectLengthNum(TARGET,CableMaxLength,totalMinLength);
            UpdateAltLengths(TARGET);
            break;
        case 1: //Y Cable (B1)
            totalMinLength = segmentMinLength * 2;
            // console.log(`Y segment Max length = ${YsegmentMaxLength}`);
            currentTotalLength = GetSumOfTotalLength(outputLength.value, inputLength.value);
            // console.log(currentTotalLength);
                switch (sectiontarget){
                    case "total":
                        totalLength.value = currentTotalLength;
                    break;              
                    case "output":
                        if (wasBtnClicked == true){
                            YSegmentChangeLength(outputLength,BUTTON);
                        }
                        else {

                        }
                    break;
                    case "input":
                        if (wasBtnClicked == true){
                            YSegmentChangeLength(inputLength,BUTTON);
                        }
                        else {

                        }
                    break;
                }
            // CorrectLengthNum(totalLength,CableMaxLength,totalMinLength);
            // CorrectLengthNum(outputLength,YsegmentMaxLength,YsegmentMinLength);
            // CorrectLengthNum(inputLength,YsegmentMaxLength,YsegmentMinLength);
            
            totalLength.value = GetSumOfTotalLength(inputLength.value,outputLength.value);
            UpdateAltLengths(totalLength);
            UpdateAltLengths(outputLength);
            UpdateAltLengths(inputLength);
            console.log(`Final Total Sum Check = ${GetSumOfTotalLength(inputLength.value,outputLength.value)}`);
            break;
        case 2: //X Cable (B2)
        totalMaxLength = 120;
        totalMinLength = 8;
        se
        currentTotalLength = Number(outputLength.value) + Number(inputLength.value) + Number(centerLength.value);
            switch (sectiontarget){
                case "output":
                    // console.log("Y cable OUTPUT button pressed");
                    if (wasBtnClicked == true){
                        if(lengthChangeDirection == "increment"){ 
                            // TARGET.value = Math.floor(Number(TARGET.value));
                            if (currentTotalLength+lengthChangeAmount>totalMaxLength){
                                break;
                            };
                            TARGET.value= Number(TARGET.value)+lengthChangeAmount;
                            totalLength.value = Number(currentTotalLength)+lengthChangeAmount;             
                            console.log("after adding = " + TARGET.value);             
                        }
                        else if(lengthChangeDirection == "decrement"){
                            // TARGET.value = Math.ceil(Number(TARGET.value)); 
                            if (currentTotalLength-lengthChangeAmount<totalMinLength){
                                break;
                            };
                            TARGET.value= Number(TARGET.value)-lengthChangeAmount;
                            totalLength.value = Number(currentTotalLength)-lengthChangeAmount; 
                            console.log("after sub = " + TARGET.value);
                        }
                    }
                    else {

                    }
                break;
                case "center":
                    // console.log("Y cable OUTPUT button pressed");
                    if (wasBtnClicked == true){
                        if(lengthChangeDirection == "increment"){ 
                            // TARGET.value = Math.floor(Number(TARGET.value));
                            if (currentTotalLength+lengthChangeAmount>totalMaxLength){
                                break;
                            };
                            TARGET.value= Number(TARGET.value)+lengthChangeAmount;
                            totalLength.value = Number(currentTotalLength)+lengthChangeAmount;             
                            console.log("after adding = " + TARGET.value);             
                        }
                        else if(lengthChangeDirection == "decrement"){
                            // TARGET.value = Math.ceil(Number(TARGET.value)); 
                            if (currentTotalLength-lengthChangeAmount<totalMinLength){
                                break;
                            };
                            TARGET.value= Number(TARGET.value)-lengthChangeAmount;
                            totalLength.value = Number(currentTotalLength)-lengthChangeAmount; 
                            console.log("after sub = " + TARGET.value);
                        }
                    }
                    else {

                    }
                break;
                case "input":
                    // console.log("Y cable INPUT button pressed");
                    if (wasBtnClicked == true){
                        if(lengthChangeDirection == "increment"){ 
                            // TARGET.value = Math.floor(Number(TARGET.value));
                            if (currentTotalLength+lengthChangeAmount>totalMaxLength){
                                break;
                            };
                            TARGET.value= Number(TARGET.value)+lengthChangeAmount;
                            totalLength.value = Number(currentTotalLength)+lengthChangeAmount;             
                            console.log("after adding = " + TARGET.value);             
                        }
                        else if(lengthChangeDirection == "decrement"){
                            // TARGET.value = Math.ceil(Number(TARGET.value)); 
                            if (currentTotalLength-lengthChangeAmount<totalMinLength){
                                break;
                            };
                            TARGET.value= Number(TARGET.value)-lengthChangeAmount;
                            totalLength.value = Number(currentTotalLength)-lengthChangeAmount; 
                            console.log("after sub = " + TARGET.value);
                        }
                    }
                    else {

                    }
                break;
            }
        CorrectLengthNum(totalLength,totalMaxLength,totalMinLength);
        CorrectLengthNum(outputLength,totalMaxLength,totalMinLength);
        CorrectLengthNum(inputLength,totalMaxLength,totalMinLength);
        UpdateAltLengths(TARGET);

            break;
    }
};

function CorrectLengthNum(numberInputTarget,Max,Min){
    let incrementBtNs = numberInputTarget.parentNode.parentNode.querySelectorAll("[data-length-direction=increment]");
    let decrementBTNS = numberInputTarget.parentNode.parentNode.querySelectorAll("[data-length-direction=decrement]");
    if (numberInputTarget.value <= Min){
        numberInputTarget.value = Min;
        for(decbtn of decrementBTNS){
            decbtn.classList.add("limit");
        };
        for(incbtn of incrementBtNs){
            incbtn.classList.remove("limit");
        };
    }
    else if (numberInputTarget.value >= Max){
        numberInputTarget.value = Max;
        for(incbtn of incrementBtNs){
            incbtn.classList.add("limit");
        };
        for(decbtn of decrementBTNS){
            decbtn.classList.remove("limit");
        };
    }
    else{
        for(decbtn of decrementBTNS){
            decbtn.classList.remove("limit");
        };
        for(incbtn of incrementBtNs){
            incbtn.classList.remove("limit");
        };

    }
};

function YSegmentChangeLength(TARGET, BUTTON){
    let lengthChangeAmount = Number(BUTTON.getAttribute("data-change_amount"));
    let lengthChangeDirection = BUTTON.getAttribute("data-length-direction");
    let OPPOSITE = "none";
    if(BUTTON.getAttribute("data-length-direction") == "increment"){
        lengthChangeDirection = "increment";
    }
    else if(BUTTON.getAttribute("data-length-direction") == "decrement"){
        lengthChangeDirection = "decrement";
    }
    else {console.log("Button direction not found!")};
    
    if(TARGET.getAttribute("data-input") == "output"){
        OPPOSITE = inputLength;
    }
    else {
        OPPOSITE = outputLength;
    }
    console.log(`Change Amount = ${lengthChangeAmount} | Change Dir = ${lengthChangeDirection}`);
    console.log(`Current Total = ${currentTotalLength} | Total MAX = ${CableMaxLength} | Total MIN = ${totalMinLength}`)
    console.log(`Y MAX = ${YsegmentMaxLength} | Y MIN = ${YsegmentMinLength}`);

    if(lengthChangeDirection == "increment"){
        if (Number(TARGET.value) + lengthChangeAmount <= YsegmentMaxLength){
            console.log(`Target will not go OVER ${YsegmentMaxLength}`);
           if (currentTotalLength + lengthChangeAmount <= CableMaxLength){
               TARGET.value = Number(TARGET.value) + lengthChangeAmount;
           }
           else if(Number(OPPOSITE.value) - lengthChangeAmount >= YsegmentMinLength){
                OPPOSITE.value = Number(OPPOSITE.value) - lengthChangeAmount;
                TARGET.value = Number(TARGET.value) + lengthChangeAmount;
           }
           else{
                OPPOSITE.value = YsegmentMinLength;
                TARGET.value = YsegmentMaxLength;
           }
        }
        else {
            console.log(`Target WILL go OVER ${YsegmentMaxLength}`);
            TARGET.value = YsegmentMaxLength;
        }
        // else if (currentTotalLength + lengthChangeAmount <= CableMaxLength){
        //     TARGET.value = YsegmentMaxLength;
        // }          
   }
   else if(lengthChangeDirection == "decrement"){ 
       if (Number(TARGET.value) - lengthChangeAmount >= YsegmentMinLength){
        console.log(`Target will not go UNDER ${YsegmentMinLength}`);
           if (currentTotalLength - lengthChangeAmount >= totalMinLength){
               TARGET.value = Number(TARGET.value) - lengthChangeAmount;
           }
           else if(Number(OPPOSITE.value) + lengthChangeAmount <= YsegmentMaxLength){
                OPPOSITE.value = Number(OPPOSITE.value) + lengthChangeAmount;
               TARGET.value = Number(TARGET.value) - lengthChangeAmount;
           }
           else {
                OPPOSITE.value = YsegmentMaxLength;
                TARGET.value = YsegmentMinLength;
           }
        }
        else {
            console.log(`Target WILL go UNDER ${YsegmentMinLength}`);
            TARGET.value = YsegmentMinLength;
        }
        // else if (currentTotalLength - lengthChangeAmount >= totalMinLength){
        //    TARGET.value = YsegmentMinLength;
        // }
   }
}
function SplitTotal(){
    let totalHalf = Number(totalLength.value)/2;
    let totalThird = Number(totalLength.value)/3;
    switch (Bconfig){
        case 0:

        break;
        case 1:
            outputLength.value = Math.floor(totalHalf);
            console.log(`Split  Total - OUTOUT = ${Math.floor(totalHalf)}`);
            inputLength.value = Math.ceil(totalHalf);
            console.log(`Split  Total - INPUT = ${Math.ceil(totalHalf)}`);
        break;
        case 2:
            outputLength.value = Math.floor(totalThird);
            centerLength.value = Number(totalLength.value) - (Math.floor(totalThird)*2);
            inputLength.value = Math.floor(totalThird);
        break;
    };
};

function GetSumOfTotalLength(...args){
    let sum = 0;
    for (let arg of args){
        sum = sum + Number(arg);     
    };
    return sum;
};

for (eachIncrementBTN of allLenghtChangeBTNs){
    eachIncrementBTN.addEventListener("click",function(e){
        let incBTN = e.currentTarget;
        let incWrapper = incBTN.parentNode;
        let numWrapper = incWrapper.parentNode;
        let target = numWrapper.querySelector("[data-input]");
        ChangeLength(target, incBTN);
        // console.log(target.value);
    }
)};

for (eachlengthNumberinput of AllLengthNumbers){
    eachlengthNumberinput.addEventListener("input",function(e){
        let currentnumWrapper = e.currentTarget.parentNode;
        // console.log(currentnumWrapper);
        currentnumWrapper.classList.add("change");
        // console.log("INPUT trigger | " + e.currentTarget.value);
        // ChangeLength(e.currentTarget);

    }
)};

for (eachlengthNumberinput of AllLengthNumbers){
    eachlengthNumberinput.addEventListener("change",function(e){
        let currentnumWrapper = e.currentTarget.parentNode;
        // console.log(currentnumWrapper);
        currentnumWrapper.classList.remove("change");
        // console.log("CHANGE trigger | " +e.currentTarget.value);
        // e.currentTarget.value = CustomRound(e.currentTarget.value,0.5);
        ChangeLength(e.currentTarget);
    }
)};



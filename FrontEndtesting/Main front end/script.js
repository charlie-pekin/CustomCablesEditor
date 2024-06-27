

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
let segmentMaxLength = 0;

let totalMinLength = 0;



//onstart
UpdateAltLengths(totalLength);
UpdateAltLengths(outputLength);
UpdateAltLengths(centerLength);
UpdateAltLengths(inputLength);

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
        const patternTotalRow = document.querySelector("[data-pattern-row=total]");
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

                patternTotalRow.classList.remove("new_hide");
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

                patternTotalRow.classList.add("new_hide");
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

                patternTotalRow.classList.add("new_hide");
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
    let BUTTON = arguments[1];

    SetTotalMinLength();
    SetSegmentMaxLength();
    LengthButtons(TARGET,BUTTON);
    CorrectLengths(TARGET);
    
    for(section of AllLengthNumbers){
        DisableLengthButtons(section,segmentMaxLength,segmentMinLength);
        UpdateAltLengths(section);
    };

    console.log(`Final Total Sum Check = ${GetSumOfTotalLength(inputLength.value,outputLength.value)}`);
};

function LengthButtons(TARGET,BUTTON){
    console.log("------------Length Buttons--------------");
    let wasBtnClicked = false;
    let lengthChangeDirection;
    if(BUTTON === undefined){
        wasBtnClicked = false;
    }
    else{
        wasBtnClicked  = true;
        lengthChangeAmount = Number(BUTTON.getAttribute("data-change_amount"));
        lengthChangeDirection = BUTTON.getAttribute("data-length-direction");

        if(lengthChangeDirection == "increment"){ 
            TARGET.value= Number(TARGET.value)+lengthChangeAmount;
        }                
        else if(lengthChangeDirection == "decrement"){
            TARGET.value= Number(TARGET.value)-lengthChangeAmount;
        }

        console.log(`Length Direction = ${lengthChangeDirection} | Change Amount = ${lengthChangeAmount}`);
        console.log(`Uncorrected OUTPUT = ${outputLength.value} | Uncorrected CENTER = ${centerLength.value} | Uncorrected INPUT = ${inputLength.value}`);
    }

    console.log(`BTN was clicked = ${wasBtnClicked}`);
}

function CorrectLengths(TARGET){
    console.log("------------Correct Length--------------");
    let op = GetOpposite(TARGET);
    let section = TARGET.getAttribute("data-input");
    console.log(`Target section = ${section}`);
    TARGET.value = CustomRound(TARGET.value, 1);
    switch(Bconfig){
        case 0:
            currentTotalLength = GetSumOfTotalLength(totalLength.value);
            LimitLength(TARGET,segmentMaxLength,segmentMinLength);
        break;
        case 1:
            currentTotalLength = GetSumOfTotalLength(outputLength.value, inputLength.value);
            LimitLength(TARGET,segmentMaxLength,segmentMinLength);
            currentTotalLength = GetSumOfTotalLength(outputLength.value, inputLength.value);
            if(currentTotalLength > CableMaxLength){
                op.value = CableMaxLength - Number(TARGET.value);
            }
            totalLength.value = GetSumOfTotalLength(inputLength.value,outputLength.value);
        break;
        case 2:
            currentTotalLength = GetSumOfTotalLength(inputLength.value,centerLength.value,outputLength.value);
            LimitLength(TARGET,segmentMaxLength,segmentMinLength);

            if(currentTotalLength > CableMaxLength){            
                console.log("need to change other lengths");
                
                switch(section){
                    case "output":
                        XLengthUpdate(TARGET,centerLength,inputLength);             
                    break;
                    case "center":
                        XLengthUpdate(TARGET,outputLength,inputLength);
                    break;
                    case "input":
                        XLengthUpdate(TARGET,centerLength,outputLength);
                    break;
                }
            }
            totalLength.value = GetSumOfTotalLength(inputLength.value,centerLength.value,outputLength.value);
        break;
    }
};
function XLengthUpdate(TARGET,element1,element2){
    let E1 = Number(element1.value);
    let E2 = Number(element2.value);

    let remainder = CableMaxLength - Number(TARGET.value);
    let targetRemainder = GetSumOfTotalLength(inputLength.value,centerLength.value,outputLength.value) - CableMaxLength;

    console.log(`Target remainder = ${targetRemainder}`);

    if (E1 > E2){
        console.log(`center ${E1} is greater than input ${E2}`);
        if((E1 - targetRemainder) < segmentMinLength){//check if sub will go below min
            console.log("EDGE CASE - center is too LOW!");
            element1.value = segmentMinLength;
            element2.value = E2 - (GetSumOfTotalLength(inputLength.value,centerLength.value,outputLength.value) - CableMaxLength);
        }
        else{
            element1.value = E1 - targetRemainder;
        }
    }
    else if(E1 < E2){
        console.log(`input ${E2} is greater than center ${E1}`);
        if((E2 - targetRemainder) < segmentMinLength){
            console.log(`EDGE CASE - input ${E2} is too LOW!`);
            element2.value = segmentMinLength;
            element1.value = E1 - (GetSumOfTotalLength(inputLength.value,centerLength.value,outputLength.value) - CableMaxLength);
        }
        else{
            element2.value = E2 - targetRemainder;
        }
    }
    else{
        console.log(`center ${E1} and input ${E2} are EQUEL`)
        element1.value = Math.ceil(remainder/2);
        element2.value = Math.floor(remainder/2);
    }    
}

function LimitLength(numberInputTarget,Max,Min){
    if (numberInputTarget.value <= Min){
        numberInputTarget.value = Min;
    }
    else if (numberInputTarget.value >= Max){
        numberInputTarget.value = Max;
    }
    else{

    }
};

function SetSegmentMaxLength(){
    switch(Bconfig){
        case 0:
            segmentMaxLength = CableMaxLength;
        break;
        case 1:
            segmentMaxLength = CableMaxLength - segmentMinLength;
        break;
        case 2:
            segmentMaxLength = CableMaxLength - (segmentMinLength*2);
        break;
    }
}
function SetTotalMinLength(){
    switch(Bconfig){
        case 0:
            totalMinLength = segmentMinLength;
        break;
        case 1:
            totalMinLength = segmentMinLength * 2;
        break;
        case 2:
            totalMinLength = segmentMinLength * 3;
        break;
    }
}
function DisableLengthButtons(numberInputTarget,Max,Min){
    let incrementBtNs = numberInputTarget.parentNode.parentNode.querySelectorAll("[data-length-direction=increment]");
    let decrementBTNS = numberInputTarget.parentNode.parentNode.querySelectorAll("[data-length-direction=decrement]");
    if (numberInputTarget.value <= Min){
        for(decbtn of decrementBTNS){
            decbtn.classList.add("limit");
        };
        for(incbtn of incrementBtNs){
            incbtn.classList.remove("limit");
        };
    }
    else if (numberInputTarget.value >= Max){
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
}

function SplitTotal(){
    console.log("----------------------------");
    totalHalf = 0; 
    totalThird = 0; 
    SetTotalMinLength();
    SetSegmentMaxLength();
    switch (Bconfig){
        case 0:

        break;
        case 1:
            currentTotalLength = GetSumOfTotalLength(totalLength.value);
            totalMinLength = segmentMinLength * 2;
            console.log(`Current Total = ${currentTotalLength} | Total Min = ${totalMinLength}`);
            if(currentTotalLength < totalMinLength){
                console.log(`SPLIT funcion - change total length to ${totalMinLength}`);
                totalLength.value = totalMinLength;
            }
            totalHalf = Number(totalLength.value)/2;
            outputLength.value = Math.floor(totalHalf);
            inputLength.value = Math.ceil(totalHalf);
            console.log(`Split Total - OUTOUT = ${outputLength.value}`);
            console.log(`Split Total - INPUT = ${inputLength.value}`);

        break;
        case 2:
            currentTotalLength = GetSumOfTotalLength(outputLength.value,inputLength.value);
            totalMinLength = segmentMinLength * 3;
            console.log(`Current Total = ${currentTotalLength} | Total Min = ${totalMinLength}`);
            if(currentTotalLength < totalMinLength){
                console.log(`SPLIT funcion - change total length to ${totalMinLength}`);
                totalLength.value = totalMinLength;
            }
            totalThird = Number(totalLength.value)/3;
            outputLength.value = Math.floor(totalThird);
            centerLength.value = Number(totalLength.value) - (Math.floor(totalThird)*2);
            inputLength.value = Math.floor(totalThird);

            console.log(`Split Total - OUTOUT = ${outputLength.value}`);
            console.log(`Split Total - CENTER = ${centerLength.value}`);
            console.log(`Split Total - INPUT = ${inputLength.value}`);
        break;
    };
    for(section of AllLengthNumbers){
        DisableLengthButtons(section,segmentMaxLength,segmentMinLength);
        UpdateAltLengths(section);
    };
};

function GetSumOfTotalLength(...args){
    let sum = 0;
    for (let arg of args){
        sum = sum + Number(arg);     
    };
    return sum;
};

function GetOpposite(TARGET){
    let op = 0;
    if(TARGET.getAttribute("data-input") == "output"){
        op = inputLength;
    }
    else {
        op = outputLength;
    };
    return op;
}

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
        //console.log(e);

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
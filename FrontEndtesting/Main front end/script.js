
import settingsJson from './settings.json' with { type: 'json' };
import connectorJson from './connectors.json' with { type: 'json' };
console.log(settingsJson);
console.log(connectorJson);

let connectorSelectorBoxes = document.getElementsByName("connector_selector_radio_group");
let connectorBubbles = document.getElementsByClassName("connector_bubble");
// let bubbleContainers = document.getElementsByClassName("main_bubble_container");
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
let Yconfig = "none";
let inputActive = false;
let outputActive = false;

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
let currentTotalLength;

const AllStrandButtons = document.querySelectorAll("[data-strand_num]");

const lengthOutputRow = document.querySelector("[data-length-row=output]");
const lengthCenterRow = document.querySelector("[data-length-row=center]");
const lengthInputRow = document.querySelector("[data-length-row=input]");

const patternOutputRow = document.querySelector("[data-pattern-row=sec1]");
const patternCenterRow = document.querySelector("[data-pattern-row=sec2]");
const patternInputRow = document.querySelector("[data-pattern-row=sec3]");

const AllPatternBtns = document.querySelectorAll("[data-pattern-btn]");

const outputA_Colors = document.querySelector("[data-connector_style-row=output_a]");
const outputB_Colors = document.querySelector("[data-connector_style-row=output_b]");
const inputA_Colors = document.querySelector("[data-connector_style-row=input_a]");
const inputB_Colors = document.querySelector("[data-connector_style-row=input_b]");

const junction_1 = document.querySelector("[data-junction-row=j1]");
const junction_2 = document.querySelector("[data-junction-row=j2]");

const AllTabs = document.querySelectorAll("[data-tab]");
const junctionTab =document.querySelector("[data-tab=junction]");
const lengthTab =document.querySelector("[data-tab=length]");

const lengthContainer = document.querySelector("[data-child-tab=length]");
const cable_colorContainer = document.querySelector("[data-child-tab=cable_color]");
const connectorContainer = document.querySelector("[data-child-tab=connector]");
const junctionContainer = document.querySelector("[data-child-tab=junction]");

//onstart
UpdateAltLengths(totalLength);
UpdateAltLengths(outputLength);
UpdateAltLengths(centerLength);
UpdateAltLengths(inputLength);

SetActiveStands(patternOutputRow.querySelector("[data-strand_num=strand_2]"));
ShowColorPickers(patternOutputRow.querySelector("[data-strand_num=strand_2]"));
SetPatternBtns(patternOutputRow.querySelector("[data-strand_num=strand_2]"));

SetActiveStands(patternCenterRow.querySelector("[data-strand_num=strand_3]"));
ShowColorPickers(patternCenterRow.querySelector("[data-strand_num=strand_3]"));
SetPatternBtns(patternCenterRow.querySelector("[data-strand_num=strand_3]"));

SetActiveStands(patternInputRow.querySelector("[data-strand_num=strand_2]"));
ShowColorPickers(patternInputRow.querySelector("[data-strand_num=strand_2]"));
SetPatternBtns(patternInputRow.querySelector("[data-strand_num=strand_2]"));

CreateConnectorCells(connectorJson);


for(const selectBox of connectorSelectorBoxes){ //loop through all the select boxes and give the current box in the loop the name "selectBox"
    selectBox.addEventListener("change", function(e){//add an event listener for each select box
        for(const bubble of connectorBubbles){ //loopt through all bubbles and give the current bublle in the loop the name "bubble"
            bubble.classList.remove("connector_bubble_active"); // remove the active class for each bubble
        };
        let selectedBubble = document.querySelector(`[data-bubble=${e.target.getAttribute("data-selector")}]`);
        selectedBubble.classList.add("connector_bubble_active");// add the active class
    });
}

for( const selectBubble of connectorBubbles){
    selectBubble.addEventListener("click", function(e){
        for(const bubble of connectorBubbles){
            bubble.classList.remove("connector_bubble_active");
        };
        let selectedBox = document.querySelector(`[data-selector=${e.currentTarget.getAttribute("data-bubble")}]`);
        selectedBox.checked = true;
        e.currentTarget.classList.add("connector_bubble_active");
    });
}


for(const countBtn of connectorCountButtons){
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
            for(const bubble of connectorBubbles){ //loopt through all bubbles and give the current bublle in the loop the name "bubble"
                bubble.classList.remove("connector_bubble_active"); // remove the active class for each bubble
            };
            rightBubblebox.classList.add("connector_bubble_active");
            Bconfig++;
            if(segment[0] == "output"){
                outputActive = true;
            }
            else if(segment[0] == "input"){
                inputActive = true;
            }
        }
        else if(countTextbox.innerHTML == removeText){
            countTextbox.innerHTML = addText;
            let newSelectorbox = document.querySelector(`[data-selector=${segment[0]}_a]`);
            newSelectorbox.checked = true;
            for(const bubble of connectorBubbles){ //loopt through all bubbles and give the current bublle in the loop the name "bubble"
            bubble.classList.remove("connector_bubble_active"); // remove the active class for each bubble
            };
            leftBubblebox.classList.add("connector_bubble_active");
            Bconfig--;
            if(segment[0] == "output"){
                outputActive = false;
            }
            else if(segment[0] == "input"){
                inputActive = false;
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
        console.log(bubbleDetailElement);
        console.log(bubbleDetailElement.getAttribute("data-bubble-connectorid"));
        bubbleDetailElement.setAttribute("data-bubble-connectorid","none");
        bubbleDetailElement.classList.add("hidden");
        SetYconfig();
        switch(Bconfig){
            case 0: //Straight Cable (B0)
            totalLength.parentNode.parentNode.classList.remove("disable");
                lengthOutputRow.classList.add("flex_hide");
                lengthCenterRow.classList.add("flex_hide");
                lengthInputRow.classList.add("flex_hide");

                patternOutputRow.classList.add("new_hide");
                patternInputRow.classList.add("new_hide");
                SetCenterName();

                outputB_Colors.classList.add("new_hide");
                inputB_Colors.classList.add("new_hide");

                junction_1.classList.add("new_hide");
                junction_2.classList.add("new_hide");

                console.log(`junction is active = ${junctionTab.classList.contains("active_red")}`);
                if(junctionTab.classList.contains("active_red")){
                    updateTabs(lengthTab);
                }
                junctionTab.classList.add("new_hide");
                break;
            case 1: //Y Cable (B1)
                totalLength.parentNode.parentNode.classList.add("disable");
                lengthOutputRow.classList.remove("flex_hide");
                lengthInputRow.classList.remove("flex_hide");
                lengthCenterRow.classList.add("flex_hide");

                if(Yconfig == "output"){
                    patternInputRow.classList.add("new_hide");
                    patternOutputRow.classList.remove("new_hide");
                    outputB_Colors.classList.remove("new_hide")
                    inputB_Colors.classList.add("new_hide");
                }
                else if(Yconfig == "input"){
                    patternInputRow.classList.remove("new_hide");
                    patternOutputRow.classList.add("new_hide");
                    outputB_Colors.classList.add("new_hide")
                    inputB_Colors.classList.remove("new_hide");
                }
                SetCenterName(Yconfig);
                SplitTotal();

                junction_1.classList.remove("new_hide");
                junction_2.classList.add("new_hide");

                junctionTab.classList.remove("new_hide");
                break;
            case 2: //X Cable (B2)
                totalLength.parentNode.parentNode.classList.add("disable");
                lengthOutputRow.classList.remove("flex_hide");
                lengthInputRow.classList.remove("flex_hide");
                lengthCenterRow.classList.remove("flex_hide");

                patternOutputRow.classList.remove("new_hide");
                patternInputRow.classList.remove("new_hide");
                SetCenterName();
                SplitTotal();

                outputB_Colors.classList.remove("new_hide");
                inputB_Colors.classList.remove("new_hide");

                junction_1.classList.remove("new_hide");
                junction_2.classList.remove("new_hide");

                junctionTab.classList.remove("new_hide");
                break;
        }
    });
};

function SetCenterName(sectionSTring){
    console.log(patternCenterRow);
    const header = patternCenterRow.querySelector("[data-pattern-header]");
    console.log(header);
    if(sectionSTring == "output"){
        header.innerHTML = "Input Colors";
    }
    else if(sectionSTring == "input"){
        header.innerHTML = "Output Colors";
    }
    else{
        header.innerHTML = "Center Colors";
    }
}
function SetYconfig(){
    if(Bconfig == 1){
        if(inputActive == true){
            Yconfig = "input";
        }
        else if(outputActive == true){
            Yconfig = "output";
        }
    }
    else{
        Yconfig = "none";
    }
    console.log(`---Yconfig = ${Yconfig}---`);
}

for(const eachCellInsertBtn of connectorCellInsertBtn){
    let currentActiveBubble;
    eachCellInsertBtn.addEventListener("click", function(e){
        for(const eachBubble of connectorBubbles){
            if(eachBubble.classList.contains("connector_bubble_active")){
                currentActiveBubble = eachBubble;
                break;
            };
        }
        console.log(currentActiveBubble);
        activeBubbleConnectorSL = currentActiveBubble.getAttribute("data-bubble");
        console.log(activeBubbleConnectorSL);
        let cellID = e.target.getAttribute("data-cell-insert");

        // let bubbleImageElement = document.querySelector(`[data-bubble-image=${activeBubbleConnectorSL}]`);
        // let bubbleTextElement = document.querySelector(`[data-bubble-text=${activeBubbleConnectorSL}]`);
        // let bubbleDetailElement = document.querySelector(`[data-bubble-detail=${activeBubbleConnectorSL}]`);
        // console.log(`[data-bubble-text=${activeBubbleConnectorSL}]`);
        // let cellImageElement = document.querySelector(`[data-cell-image=${cellID}]`);
        // let cellValues = document.querySelectorAll(`[data-cell-cid=${cellID}`);
        // let cellValueName = cellValues[1].getAttributeNode("value").value;
        // let cellValueSize = cellValues[2].getAttributeNode("value").value;

        // bubbleImageElement.src = cellImageElement.src;
        // console.log(bubbleTextElement);
        // bubbleTextElement.innerHTML = cellValueName + ", " + cellValueSize;
        // bubbleTextElement.classList.remove("hidden");
        // bubbleDetailElement.classList.remove("hidden");

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
    
    for(const section of AllLengthNumbers){
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
        let lengthChangeAmount = Number(BUTTON.getAttribute("data-change_amount"));
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
        for(const decbtn of decrementBTNS){
            decbtn.classList.add("limit");
        };
        for(const incbtn of incrementBtNs){
            incbtn.classList.remove("limit");
        };
    }
    else if (numberInputTarget.value >= Max){
        for(const incbtn of incrementBtNs){
            incbtn.classList.add("limit");
        };
        for(const decbtn of decrementBTNS){
            decbtn.classList.remove("limit");
        };
    }
    else{
        for(const decbtn of decrementBTNS){
            decbtn.classList.remove("limit");
        };
        for(const incbtn of incrementBtNs){
            incbtn.classList.remove("limit");
        };

    }
}

function SplitTotal(){
    console.log("----------------------------");
    let totalHalf = 0; 
    let totalThird = 0; 
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
    for(const section of AllLengthNumbers){
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

for (const eachIncrementBTN of allLenghtChangeBTNs){
    eachIncrementBTN.addEventListener("click",function(e){
        let incBTN = e.currentTarget;
        let incWrapper = incBTN.parentNode;
        let numWrapper = incWrapper.parentNode;
        let target = numWrapper.querySelector("[data-input]");
        ChangeLength(target, incBTN);
        // console.log(target.value);
    }
)};

for (const eachlengthNumberinput of AllLengthNumbers){
    eachlengthNumberinput.addEventListener("input",function(e){
        let currentnumWrapper = e.currentTarget.parentNode;
        // console.log(currentnumWrapper);
        currentnumWrapper.classList.add("change");
        // console.log("INPUT trigger | " + e.currentTarget.value);
        // ChangeLength(e.currentTarget);
        //console.log(e);

    }
)};

for (const eachlengthNumberinput of AllLengthNumbers){
    eachlengthNumberinput.addEventListener("change",function(e){
        let currentnumWrapper = e.currentTarget.parentNode;
        // console.log(currentnumWrapper);
        currentnumWrapper.classList.remove("change");
        // console.log("CHANGE trigger | " +e.currentTarget.value);
        // e.currentTarget.value = CustomRound(e.currentTarget.value,0.5);
        ChangeLength(e.currentTarget);
    }
)};

for (const eachStrandBtn of AllStrandButtons){
    eachStrandBtn.addEventListener("click",function(e){
        SetActiveStands(this);
        ShowColorPickers(this);
        SetPatternBtns(this);
    });
}

function ShowColorPickers(target){
    const strand_num = Number(target.innerHTML);
    const standRowParent = target.parentNode.parentNode.parentNode;
    console.log(`Num of strands selected = ${strand_num}`);
    const AllColorPickers = standRowParent.querySelectorAll("[data-color_picker]");
    console.log(AllColorPickers);
    for (const eachColorPicker of AllColorPickers){
        const colorPickerNum = Number(eachColorPicker.getAttribute("data-color_picker"));
        if(colorPickerNum <= strand_num){
            eachColorPicker.classList.remove("new_hide");
        }
        else{
            eachColorPicker.classList.add("new_hide");
        }
    }
}
function SetActiveStands(target){
    const btnWrapper = target.parentNode;
    const wrapperBtns = btnWrapper.querySelectorAll("[data-strand_num]");
    for (const eachBtn of wrapperBtns){
        eachBtn.classList.remove("active_red");
    }
    target.classList.add("active_red");
}
function SetPatternBtns(target){
    const strand_num = target.getAttribute("data-strand_num");
    const strandsJson = settingsJson.strands;
    const flatJson = strandsJson[strand_num].flat;
    const roundJson = strandsJson[strand_num].round;


    const standRowParent = target.parentNode.parentNode.parentNode;
    const flatBtn = standRowParent.querySelector("[data-pattern-btn=flat]");
    const roundBtn = standRowParent.querySelector("[data-pattern-btn=round]");
    console.log(`${strand_num}: Flat = ${flatJson} | Round = ${roundJson}`);
    if (flatJson == false){
        console.log("cable DOES NOT have a flat option");
        if(flatBtn.classList.contains("active_red") == true || roundBtn.classList.contains("active_red") == false){
            flatBtn.classList.remove("active_red");
            roundBtn.classList.add("active_red");
            roundBtn.classList.remove("limit");
        }
        
        flatBtn.classList.add("limit");
    }
    else{
        console.log("cable does have a flat option");
        flatBtn.classList.remove("limit");
        if(roundJson == false){
            console.log("cable DOES NOT have a round option");
            roundBtn.classList.add("limit");
            roundBtn.classList.remove("active_red");
            flatBtn.classList.add("active_red");
        }
        else{
            console.log("cable does have a round option");
            roundBtn.classList.remove("limit");
            if(flatBtn.classList.contains("active_red") == false && roundBtn.classList.contains("active_red") == false){
                flatBtn.classList.add("active_red");
            }
        }
    }
}

for (const eachbtn of AllPatternBtns){
    eachbtn.addEventListener("click", function(e){
        const parent = this.parentNode;
        const allpatternBtns = parent.querySelectorAll("[data-pattern-btn]");
        for (const pb of allpatternBtns){
            pb.classList.remove("active_red");
        }
        this.classList.add("active_red");
    });
}

for (const eachTab of AllTabs){
    eachTab.addEventListener("click",function(e){
        updateTabs(this);
    });
}

function updateTabs(tab){
    const activeTab = tab.getAttribute("data-tab");
        console.log(`Active Tab = ${activeTab}`);
        for (const tabs of AllTabs){
            tabs.classList.remove("active_red");
        }
        tab.classList.add("active_red");
        switch(activeTab){
            case "length":
                console.log("container Length in focus");
                SwapContainer(lengthContainer, "center");
                SwapContainer(cable_colorContainer, "right");
                SwapContainer(connectorContainer, "right");
                SwapContainer(junctionContainer, "right");
            break;
            case "cable_color":
                console.log("container cable_color in focus");
                SwapContainer(lengthContainer, "left");
                SwapContainer(cable_colorContainer, "center");
                SwapContainer(connectorContainer, "right");
                SwapContainer(junctionContainer, "right");
            break;
            case "connector":
                console.log("container connector in focus");
                SwapContainer(lengthContainer, "left");
                SwapContainer(cable_colorContainer, "left");
                SwapContainer(connectorContainer, "center");
                SwapContainer(junctionContainer, "right");
            break;
            case "junction":
                console.log("container junction in focus");
                SwapContainer(lengthContainer, "left");
                SwapContainer(cable_colorContainer, "left");
                SwapContainer(connectorContainer, "left");
                SwapContainer(junctionContainer, "center");
            break;
        }
}
function SwapContainer(element,location){
    const lHide = "hide_left";
    const rHide = "hide_right";
    const CL = element.classList;
    switch(location){
        case "center":
            CL.remove(lHide);
            CL.remove(rHide);
        break;
        case "right":
            CL.add(rHide)
            CL.remove(lHide);
        break;
        case "left":
            CL.remove(rHide);
            CL.add(lHide);
        break;
    }
}

function CreateConnectorCells(Cjson){
    const temp = document.getElementById("conenctor_template");
    const resultsElement = document.getElementById("connector_results");
    const content = temp.content.cloneNode(true);
    const spans = content.querySelectorAll("[data-temp-target]");
    console.log(spans);

    console.log(`Number of Connectors in JSON = ${Object.keys(Cjson).length}`);

    for(const currentSpan of spans){
        console.log(currentSpan.attributes[0]);
    }
    
    for (const keys in Cjson){

    }
}
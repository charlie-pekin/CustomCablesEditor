
let connectorSelectorBoxes = document.getElementsByName("connector_selector_radio_group");
let connectorBubbles = document.getElementsByClassName("connector_bubble");
let activeBubbleConnectorSL;

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

let connectorCountButtons = document.getElementsByClassName("connector_count_button");
let addText = "Add";
let removeText = "Remove";
for(countBtn of connectorCountButtons){
    countBtn.addEventListener("click", function(e){
        let currentCountBtnID = e.currentTarget.getAttribute("data-count_connector");
        const segment = currentCountBtnID.split("_");
        let countTextbox = document.querySelector(`[data-connector_count-text=${currentCountBtnID}]`);
        let selectorbox = document.querySelector(`[data-selector=${currentCountBtnID}]`)
        let selectorContainer = document.querySelector(`[data-selector-container=${currentCountBtnID}]`);
        let bubblebox = document.querySelector(`[data-bubble=${currentCountBtnID}]`);
        // let bubbleContainer = document.querySelector(`[data-bubble-container=${currentCountBtnID}]`);

        let leftBubblebox = document.querySelector(`[data-bubble=${segment[0]}_a]`);
        let rightBubblebox = document.querySelector(`[data-bubble=${segment[0]}_b]`);

        if(countTextbox.innerHTML == addText){
            countTextbox.innerHTML = removeText;
        }
        else if(countTextbox.innerHTML == removeText){
            countTextbox.innerHTML = addText;
            if(selectorbox.checked == true){
                console.log("B is checked");
                let newSelectorbox = document.querySelector(`[data-selector=${segment[0]}_a]`);
                newSelectorbox.checked = true;
                rightBubblebox.classList.remove("connector_bubble_active");
                leftBubblebox.classList.add("connector_bubble_active");
            }
        }
        selectorContainer.classList.toggle("hidden");     
        rightBubblebox.classList.toggle("right_io");
        leftBubblebox.classList.toggle("left_io");      
    });
};

let connectorCellInsertBtn = document.querySelectorAll("[data-cell-insert]");
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
        activeBubbleConnectorSL = currentActiveBubble.getAttribute("[data-bubble]");
        let segment = activeBubbleConnectorSL.split("_")
        //get all bubbles
        //get the active bubble
        //get active bubble connector segment and letter

    });
};



let connectorSelectorBoxes = document.getElementsByName("connector_selector_radio_group");
let connectorBubbles = document.getElementsByClassName("connector_bubble");
let bubbleContainers = document.getElementsByClassName("main_bubble_container");
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
        }
        else if(countTextbox.innerHTML == removeText){
            countTextbox.innerHTML = addText;
            let newSelectorbox = document.querySelector(`[data-selector=${segment[0]}_a]`);
            newSelectorbox.checked = true;
            for(bubble of connectorBubbles){ //loopt through all bubbles and give the current bublle in the loop the name "bubble"
            bubble.classList.remove("connector_bubble_active"); // remove the active class for each bubble
            };
            leftBubblebox.classList.add("connector_bubble_active");
        }
        selectorContainer.classList.toggle("connector_selector_radio_container_hidden");     
        rightBubbleContainer.classList.toggle("move_right_io");
        leftBubbleContainer.classList.toggle("move_left_io");
        
        bubbleImageElement.src = "";
        bubbleTextElement.innerHTML = "";
        bubbleTextElement.classList.add("hidden");
        bubbleDetailElement.getAttribute("data-bubble-connectorid").value = "";
        bubbleDetailElement.classList.add("hidden");
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

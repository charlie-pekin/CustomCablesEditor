
let connectorSelectorBoxes = document.getElementsByName("connector_selector_radio_group");
let connectorBubbles = document.getElementsByClassName("connector_bubble");
console.log (connectorSelectorBoxes);

for(selectBox of connectorSelectorBoxes){ //loop through all the select boxes and give the current box in the loop the name "selectBox"
    selectBox.addEventListener("change", function(e){//add an event listener for each select box
        for(bubble of connectorBubbles){ //loopt through all bubbles and give the current bublle in the loop the name "bubble"
            bubble.classList.remove("connector_bubble_active"); // remove the active class for each bubble
        };
        // selectedBubble = document.getElementById(e.target.value);//find the matching select box and bubble by using the select box value and the bubble ID
        selectedBubble = document.querySelector(`[data-bubble=${e.target.getAttribute("data-selector")}]`);
        selectedBubble.classList.add("connector_bubble_active");// add the active class
    });
};

for(selectBubble of connectorBubbles){
    selectBubble.addEventListener("click", function(e){
        for(bubble of connectorBubbles){
            bubble.classList.remove("connector_bubble_active");
        };
        // selectedBox = document.querySelector(`[value=${e.target.id}]`);
        selectedBox = document.querySelector(`[data-selector=${e.target.getAttribute("data-bubble")}]`);
        selectedBox.checked = true;
        e.target.classList.add("connector_bubble_active");
    });
}

let connectorCountButtons = document.getElementsByClassName("connector_count_button");
let addText = "Add"
let removeText = "Remove"
var countText = addText;
console.log(connectorCountButtons);
for(countBtn of connectorCountButtons){
    countBtn.addEventListener("click", function(e){
        console.log("click");
        console.log(e);
        console.log(e.target);
        let currentCountBtnID = e.currentTarget.getAttribute("data-count_connector");
        console.log(currentCountBtnID);
        if(countText == addText){
            countText = removeText;
        }
        else{
            countText = addText;
        }
        let selectorbox = document.querySelector(`[data-selector-container=${currentCountBtnID}]`);
        selectorbox.classList.toggle("hidden");
        let bubblebox = document.querySelector(`[data-bubble=${currentCountBtnID}]`);
        bubblebox.classList.toggle("hidden");
        let countTextbox = document.querySelector(`[data-connector_count-text=${currentCountBtnID}]`);
        countTextbox.innerHTML= countText;
    });
};

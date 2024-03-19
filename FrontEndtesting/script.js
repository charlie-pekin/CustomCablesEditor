
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

let addConnectors = document.querySelectorAll("[data-add_connector]");

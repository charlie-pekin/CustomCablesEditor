
let connectorSelectorBoxes = document.getElementsByName("connector_selector_radio_group");
let connectorBubbles = document.getElementsByClassName("connector_bubble");
console.log (connectorSelectorBoxes);

for(selectBox of connectorSelectorBoxes){
    selectBox.addEventListener("change", function(e){
        for(bubble of connectorBubbles){
            bubble.classList.remove("connector_bubble_active");
        };
        selectedBubble = document.getElementById(e.target.value);
        selectedBubble.classList.add("connector_bubble_active");
    });
};

for(selectBubble of connectorBubbles){
    selectBubble.addEventListener("click", function(e){
        for(bubble of connectorBubbles){
            bubble.classList.remove("connector_bubble_active");
        };
        selectedBox = document.querySelector(`[value=${e.target.id}]`);
        selectedBox.checked = true;
        e.target.classList.add("connector_bubble_active");
    });
}
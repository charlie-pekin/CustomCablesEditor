
let connectorSelectorBoxes = document.getElementsByName("connector_selector_radio_group");
let connectorBubbles = document.getElementsByClassName("connector_bubble");
console.log (connectorSelectorBoxes);

for(selectBox of connectorSelectorBoxes){
    selectBox.addEventListener("change", function(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.checked);
        for(bubble of connectorBubbles){
            bubble.classList.remove("connector_bubble_active");
        };

        selectedBubble = document.getElementById(e.target.value);
        console.log(selectedBubble);
            selectedBubble.classList.add("connector_bubble_active");
    });
};

for(selectBubble of connectorBubbles){
    selectBubble.addEventListener("click", function(e){
        console.log("selectBubble")
    });
}
/* [Bug -1]: Bulb image not changing on-click
   [CAUSE]: No event listener added and no function to swap images.
   [FIX]: Add event listener for the image and a function to swap class names (as provided in CSS file)
   [ALTERNATIVES]: Use Img src attribute in html rather than CSS background property for faster loading speeds 
   (unless CSS animations are applied, then CSS property is more efficient)
*/
(function SwapBulbImages(){
    let bulbImg = document.querySelector('#bulb'); // [1] Since the goal is to change the class name, we query the class ID instead.

        bulbImg.addEventListener("click", () => {  // Event Listener does not require an event parameter because we don't need any event data from the element.
        
        // [1] This switch function sets the bulb class name to the opposite of whichever it was initially.
        switch(bulbImg.className) {
            case 'bulb-off':
                bulbImg.className = 'bulb-on'
                break;
            case 'bulb-on':
                bulbImg.className = 'bulb-off'
                break;
        }
    })

})();
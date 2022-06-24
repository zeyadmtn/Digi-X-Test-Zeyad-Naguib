(function(){
  
  let screen = document.querySelector('.screen');
  let buttons = document.querySelectorAll('.btn');
  let clear = document.querySelector('.btn-clear');
  let equal = document.querySelector('.btn-equal');
  
  buttons.forEach(function(button){
    button.addEventListener('click', function(e){
      let value = e.target.dataset.num;
      screen.value = value;
    })
  });
  
  //1. PROBLEM: The first bug is that when you click on equal, the function takes whatever value is on screen and concatenates it,
  //            So if you click on 3, it will display 33 regardless of operation chosen.
  //   REASON: what's causing this bug is the screen.value += answer, it does not conduct any operation and it concatenates both strings.
  //   FIX:   
  // equal.addEventListener('click', function(e){
  //   console.log("equal clicked");
  //   if(screen.value === ''){
  //     screen.value = 'Please Enter a Value';
  //   } else {
  //     let answer = eval(screen.value);
  //     screen.value += answer;
  //   }
  // })
  
  equal.addEventListener('click', function(e){
    console.log("equal clicked");
    if(screen.value === ''){
      screen.value = 'Please Enter a Value';
    } else {
      let answer = eval(screen.value);
      screen.value += answer;
    }
  })
  
  clear.addEventListener('click', function(e){
    screen.value = '';
  })
 
})();

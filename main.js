// Write your JavaScript here
var coins = [   ["quarters-output",   0.25,    "<img class = 'imgCoins animated bounceInRight' src = 'https://coins.thefuntimesguide.com/files/1976-rare-quarters.jpg' alt = 'quarters-output' />"],
                ["dimes-output",      0.10,    "<img class = 'imgCoins animated bounceInRight' src = 'https://s3.amazonaws.com/ngccoin-production/us-coin-explorer-category/50r.jpg' alt = 'dimes-output' />"],
                ["nickels-output",    0.05,    "<img class = 'imgCoins animated bounceInRight' src = 'https://s3.amazonaws.com/ngccoin-production/coin-grading-guide/Buffalo-Five-Cents-Reverse.jpg' alt = 'nickels-output' />"],
                ["pennies-output",    0.01,    "<img class = 'imgCoins animated bounceInRight' src = 'https://upload.wikimedia.org/wikipedia/commons/e/e6/2009Centobverse.jpg' alt = 'pennies' />"]   ];

var bills = [   ["one-hundred",   100,    "<img class = 'imgBills animated bounceInLeft' src = 'http://www.slate.com/content/dam/slate/blogs/business_insider/2013/10/08/130810_bi_100billfront.jpg' alt = 'one-hundred' />"],
                ["fifty",          50,    "<img class = 'imgBills animated bounceInLeft' src = 'https://www.marshu.com/articles/images-website/articles/presidents-on-us-paper-money/fifty-50-dollar-bill.jpg' alt = 'fifty' />"],
                ["twenty",         20,    "<img class = 'imgBills animated bounceInLeft' src = 'https://www.workers.org/wp-content/uploads/US-20-dollar-bill.jpg' alt = 'twenty' />"],
                ["ten",            10,    "<img class = 'imgBills animated bounceInDown' src = 'https://www.wpclipart.com/money/US_Currency/US_currency_large/ten_dollar_bill_US.jpg' alt = 'ten' />"],
                ["five",           05,    "<img class = 'imgBills animated bounceInDown' src = 'https://savemoneyfastwithfives.files.wordpress.com/2014/12/fivedollarbill.jpg' alt = 'five' />"],                
                ["ones", 01,    "<img class = 'imgBills animated bounceInDown' src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Onedolar2009series.jpg/1200px-Onedolar2009series.jpg' alt = 'dollars-output' />"]   ];

var countTimer = 1500;

function makeChange(received, due)  {                      //returns the total change due
    return (received - due);
}


function clickEvent(e)   {                                       //function called when 'CALCULATE' btn is clicked
    var totRec = document.getElementById('amount-received').value;       //get user inputs from #totRec & # toDue
    var totDue = document.getElementById('amount-due').value;
    var diff = makeChange(totRec, totDue);                      //pass user inputs to makeChange fnctn as arguments, fnctn makeChange returns the total change due
    var coinage = coinCount(diff.toFixed(2));                   //passes var diff truncated to 2 decimal places to coinCount fnctn
 
    //document.getElementByclassName('count').className += ' animated bounceInRight'; 

    return document.getElementById('output-total').innerHTML = "Total change due is: $" + diff.toFixed(2) + "<hr class = 'style2'> ";
    //returns var diff truncated to 2 decimal places in line w/ output statement to #output-total 
    
}

function coinCount(remain)   {                                  //function that sperates the total change into specific coins, 'remain' = var diff.toFixed(2)
    var noCoins = Math.floor(remain);                           //Math.floor rounds a float down to it's nearest integer, var noCoins = dollar amount due in change
    var decimals = remain - noCoins;                            //sets var decimals = change due - whole dollars (i.e. change remaining in coins)
    decimals = decimals.toFixed(2);                             
   // document.getElementById('dollars').innerHTML = "Expect $" + noCoins + " back in bills";
   return document.getElementById('dollars-output').innerHMTL = noCoins;
   
   
/* --------------------------------------------BILLS RETURNED---------------------------------------------- */
// ---------------------------------------------------------------------------------------------------------

    for (var j = 0; j < bills.length; j++)   {

        var billReturn = ( noCoins / bills[j][1]);
        billReturn = Math.floor(billReturn);

        var extraBills = ( noCoins % bills[j][1]);

        animateBills(bills[j][0], 0, billReturn, countTimer);

        document.getElementById(bills[j][0]).innerHTML = bills[j][2];                       //"Expect to receive " + billReturn + " " + bills[j][0] + " dollar bills." + "<br/>" + bills[j][2];
        //document.getElementById(bills[j][0] + 'Img').innerHTML = bills[j][2];

        noCoins = extraBills;
    }
/* --------------------------------------------BILLS INT ANIMATION---------------------------------------------- */
// ---------------------------------------------------------------------------------------------------------

function animateBills(id, start, end, duration) {
    var range = end - start;                            //console.log(range);
    var current = start;
                                                        //console.log(current);
    var increment = end > 0? 1:0;                              
    var stepTime =  1000;   
    var obj = document.getElementById(id+'Count');              //console.log(obj);
    //var obj = '';                                                    //console.log(obj);
    var timer = setInterval(function() {
        current += increment;
        //obj = current;                                                //console.log(current);
        obj.innerHTML =  "Expect to receive " + current + " " + id + " dollar bills.";
       
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}


/* --------------------------------------------COINS RETURNED---------------------------------------------- */
// ---------------------------------------------------------------------------------------------------------

    for (var n = 0; n < coins.length; n++)  {
        
        var coinReturn = (decimals / coins[n][1]);
        coinReturn = Math.floor(coinReturn);
                
        var looseChange = (decimals % coins[n][1]);
        looseChange = looseChange.toFixed(2);       

        animateCoins(coins[n][0], 0, coinReturn, countTimer);
        
        document.getElementById(coins[n][0]).innerHTML = coins[n][2]           //"Expect to receive " + counter + " " + coins[n][0] + " as change." + coins[n][2];

     
        
        decimals = looseChange;
    }
/* --------------------------------------------COIN INT ANIMATION ---------------------------------------------- */
// ---------------------------------------------------------------------------------------------------------

    function animateCoins(id, start, end, duration) {
        var range = end - start;                            //console.log(range);
        var current = start;
                                                            //console.log(current);
        var increment = end > 0? 1:0;                              
        var stepTime =  1000;   
        var obj = document.getElementById(id+'Count');              //console.log(obj);
        //var obj = '';                                                    //console.log(obj);
        var timer = setInterval(function() {
            current += increment;
            //obj = current;                                                //console.log(current);
            obj.innerHTML =  "Expect to receive " + current + " " + id + " as change.";
           
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

}

/* -----------------------------------------------PLAY AUDIO ---------------------------------------------- */
// ---------------------------------------------------------------------------------------------------------

function audioPlay(){
  $('#audio').get(0).play();
  //document.getElementById('audio').play();
}



function showDisplay(text)
{
    var str = document.getElementById("display").value;
    var n = str.length;
    
    //If there is only one operator, this will add a zero before the operator
    if(n==0)
    {
        if(checkIfOperator(text))
        {
            document.getElementById("display").value = '0';
        }
    }

    //To avoid operator combinations not allowed by javascript like +*,*/,/*
    if(checkOperatorCombinations(text , str[n-1]) )
    {
        document.getElementById("display").value += text;
    }
}

function calculate()
{
    try
    {
        let expression = document.getElementById("display").value;
        var n = expression.length;
        
        //If last element is an operator
        if(checkIfOperator(expression[n-1]))
        {
            expression = expression.substring(0,n-1);
        }
        document.getElementById("result").innerHTML = eval(expression);  
    }
    catch(err)
    {
        document.getElementById("result").innerHTML = "ERROR";
        document.getElementById("err_msg").innerHTML = "Error : " + err.message;
    }
}

function clr()
{
    document.getElementById("display").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("err_msg").innerHTML = "";
}

function checkOperatorCombinations(current , previous)
{
    //Checking all the combination of conditions not allowed by javascript for calculation
    
    //Checking '+' operator combination
    if(previous=='+' && ['+', '*' , '/'].includes(current))
    {
        return false;
    }
    //Checking '-' operator combination
    if(previous=='-' && ['-' , '*' , '/'].includes(current))
    {
        return false;
    }
    //Checking '*' operator combination
    if(previous=='*' && current=='/')
    {
        return false;
    }
    //Checking '/' operator combination
    if(previous=='/' && ['*','/'].includes(current))
    {
         return false;
    }
    // Return true if all the above conditions fail
    return true;
}

// To check whether it is an operator
function checkIfOperator(operator)
{
    var ops=['+','-','*','/'];
     
    for(i in ops)
    {
         if(operator == ops[i])
         {
             return true;
         }
    }
    return false;
}

// To hide Calculator heading and error message in mobile view
$(document).ready(function(){

    if($(window).width()< 480)
    {
        document.getElementById('calc_heading').remove();
        document.getElementById('err_msg').remove();

        //Change equal button size according to screen size
        var height = $("#eq_td").height();
        $("#equal_button").css('height' , height );
    }
});

const outputElement=document.querySelector('#output');
const btnCopy=document.querySelector('#btnCopy');
const passwordLengthElement=document.querySelector('#length');
const numberElement=document.querySelector('#number');
const capitalElement=document.querySelector('#capital');
const smallElement=document.querySelector('#small');
const symbolElement=document.querySelector('#symbol');
const frm=document.querySelector('#frm');

// Button click to copy password
btnCopy.addEventListener('click',async()=>{
    const pass=outputElement.value;
    if(pass){
        await navigator.clipboard.writeText(pass);
        alert("Copied to clipboard");
    }else{
        alert("There is no password to copy");
    }
});

function generateRandomChar(min,max)
{
    const limit=max-min+1;      //fromCharCode --> ascii value convertion eg: 65 -> 'A'
    return String.fromCharCode(Math.floor(Math.random()*limit)+min);
}

function capitalValue(){
    return generateRandomChar(65,90);
}
function smallValue(){
    return generateRandomChar(97,122);
}
function numberValue(){
    return generateRandomChar(48,57);
}
function symbolValue(){
    const symbols="!@#$%^&*()_+{}<>?|.";
    return symbols[Math.floor(Math.random()*symbols.length)];
}

//Communicate
const functionArray=[
    {
        checkbox:numberElement,  //checkbox or element anythng we want
        fun:numberValue
    },
    {
        checkbox:capitalElement,
        fun:capitalValue
    },
    {
        checkbox:smallElement,
        fun:smallValue
    },
    {
        checkbox:symbolElement,
        fun:symbolValue
    }
];

frm.addEventListener('submit',(e)=>{
    e.preventDefault();   //doesn't go to next page
    const len=passwordLengthElement.value;  //it will indicate the password length(the value must be between 6-8)


    let generatedPassword="";
    const funArray=functionArray.filter(({checkbox})=>checkbox.checked);
    console.log(funArray); //optional
    for(i=0;i<len;i++){
        const index=Math.floor(Math.random()*funArray.length);
        const letter=funArray[index].fun();
        generatedPassword+=letter;
    }


    outputElement.value=generatedPassword
})
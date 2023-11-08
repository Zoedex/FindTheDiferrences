let input1 = [];
let input2 = [];
// get value from input field
const getValue = (id) => {
    return document.querySelector(`${id}`).value;
}

//compare array function
const compareArrays = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

//push earch word to an array
const splitField = (field, array) => {
    array.length = 0;
    let newArray = field.split(/\s+/);
    array.push(...newArray);
    console.log('spit field ' , array);
}


//compare (arr1 > arr2)
const generateResult = (array1, array2, textClass) => {
    let dummyArr = array1.slice();
    let arr2Length = array2.length;
    console.log('generate')
    for(let i = 0 ; i < arr2Length ; i++){
        console.log('first loop', i)
        for (let j = 0; j < dummyArr.length ; j++){

            console.log('second loop',dummyArr[j],array2[i])
            if (dummyArr[j] === array2[i]) {
                dummyArr.splice(j,1);
                j--;
                break;
            }
        }
    }

    console.log(dummyArr)

    // start generating differrences
    let resultLabel = '';
    let result = '';
    let count = 0;

    if (dummyArr.length === array1.length){
        resultLabel = 'Result:';
        result = 'These two text are completely different';
    } else {
        for(let word in array1){
            console.log(word)
            if (array1[word] === dummyArr[count]) {
                result += `<span>${array1[word]}</span> `;
                count ++;
            }else {
                result += `${array1[word]} `;
                
            }
        }
        resultLabel = `Result: Here are what ${textClass} text missing.`
    }
    
    document.querySelector('#result-label').innerHTML = resultLabel;
    document.querySelector('#result').innerHTML = result;

}

// find 
const find = () => {
    const primaryText = 'primary';
    const secondaryText = 'secondary';
    if (getValue('#input1') === '' || getValue('#input2') === '') {
        return
    } else {
        splitField(getValue('#input1'), input1);
        splitField(getValue('#input2'), input2);

        if (compareArrays(input1,input2)){
            document.querySelector('#result-label').innerHTML = 'Result:';
            document.querySelector('#result').innerHTML = 'There is no any differences.';

        }else if(input1.length >= input2.length){
            generateResult(input1,input2,secondaryText);
            
        }else {
            generateResult(input2,input1,primaryText);
            
        }

    }
}


//clear function 

const clear = () => {
    console.log('clicked');
    input1.length = 0;
    input2.length = 0;
    document.querySelector('#result-label').innerHTML = 'Result:';
    document.querySelector('#result').innerHTML = '';
}

const button = document.querySelector('.clear-btn');
button.addEventListener('click', function() {
    clear();
    document.querySelector('#input1').value = '';
    document.querySelector('#input2').value = '';
});
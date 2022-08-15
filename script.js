window.onload = () => {

	function test(){
		let x = encrypt('CRAZYcrazy', 1);

		let y = decrypt('DSBAZdsbazDSBAZdsbaz', 1);

		console.log(x);
		//console.log(y);

	}
	
	test();


  encryptorForm.addEventListener('submit', (event) => {
    // this prevents a document reload on submit (where usually it would make a server call)
    event.preventDefault();

    //get the encryption key and store it
    let keyElement = document.getElementById('encryption-key');
    let key = keyElement.value;
    
    // get the encryption text and store it
    var textElement = document.getElementById('encryption-text');
    var text = textElement.value;
   

    var encrypted = encrypt(text, key);
    console.log(encrypted);

    //set the value on 
    document.getElementById('encrypted-text-div').style.display ='block';
    document.getElementById('encrypted-text').innerHTML = encrypted;

  });






	function encrypt(sentence, shift){

		console.log('shift:' + shift);
		console.log('sentence: ' + sentence)

		let intShift = parseInt(shift);

		let arr = [];
		for(let i = 0; i < sentence.length; i++)
		{
			let letter = sentence[i];
			
			let charCode = letter.charCodeAt() + intShift;
			console.log('letter charCode: ' + letter.charCodeAt() + ' and new letter code is ' + charCode);
			let newCharCode;
			if(letter == letter.toLowerCase() && charCode % 'a'.charCodeAt() < 26 || letter == letter.toUpperCase() && charCode % 'A'.charCodeAt() < 26)
			{
				console.log(charCode % 'a'.charCodeAt() + 'so letter is good');
				newCharCode = charCode;
			}
			else if(charCode % 'a'.charCodeAt() > 26)
			{
				
				newCharCode = 'a'.charCodeAt() + intShift;
			}
			else if (charCode % 'A'.charCodeAt() > 26)
			{
				
				newCharCode = 'A'.charCodeAt() + intShift;
			}
			
			let newLetter = String.fromCharCode(newCharCode);
			arr.push(newLetter);
		}
		
		let encrypted = arr.join("").replace(/{/g, 'a').replace(/[\[\]']+/g, 'A');

		return(encrypted);

	}

	function decrypt(sentence, shift){

		let arr = [];
		for(let i = 0; i < sentence.length; i++)
		{
			let letter = sentence[i];
			let newCharCode = sentence[i].charCodeAt() - shift;
			let newLetter = String.fromCharCode(newCharCode);
			arr.push(newLetter);
		}
		
		let decrypted = arr.join("").replace(/`/g, 'z').replace(/@/g, 'Z');

		return(decrypted);
	}
}
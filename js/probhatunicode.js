/*
 * Unicode Probhat Parser for writing in webpages
 * This script transliterate the user input and display unicode bangla characters accoring to probhat keyboard layout 
  
 This scirpt is based on phpexpert Hasin Hayder's phonetic parser script
 Name: Web based parser for probhat layout
 Author: Sabuj Kundu aka manchumahara
 Email:manchumahara@gmail.com 
 Webpage:http://manchu.wordpress.com	 
 Last Modification: Ra-Jphola issue solved 01/11/2008 by Sabuj kundu
 License:LGPL	 
 Yet to do: Key stroke with Right alt and Shift alt key parsing,is it possible with java script ?
 For any problem/suggestion plz inform me	
 Last Modification: 26 Jan 2008 by Omi Azad (http://omi.net.bd)
*/
// Set of Characters
var activeta; //active text area
var probhat=new Array();
//  First line
probhat['`']='\u200d'; //ZWJ   `~
probhat['~']='~';//
//digits
probhat['1']='\u09e7';//'১';
probhat['2']='\u09e8';//'২';
probhat['3']='\u09e9';//'৩';
probhat['4']='\u09ea';//'৪';
probhat['5']='\u09eb';//'৫';
probhat['6']='\u09ec';//'৬';
probhat['7']='\u09ed';//'৭';
probhat['8']='\u09ee';//'৮';
probhat['9']='\u09ef';//'৯';
probhat['0']='\u09e6';//'০'; 
probhat['-']='-';
probhat['=']='=';
//shift digit
probhat['!']="!";
probhat['@']='@';
probhat['#']='#';
probhat['$']='\u09f3';  //bengali taka(BDT) sign ৳
probhat['%']='%';
probhat['^']='^';
probhat['&']='\u099e';   //ঞ niyo
probhat['*']='\u09ce';    //ৎ  khanda ta
probhat['(']='(';
probhat[')']=')';
probhat['_']='_';
probhat['+']='+';
//2nd line	
probhat['q']='\u09a6'; //দ
probhat['Q']='\u09a7';//ধ
probhat['w']='\u09c2';  //ঊ-কার  
probhat['W']='\u098a';  // ঊ
probhat['e']='\u09c0'; //ঈ-কার
probhat['E']='\u0988'; // ঈ
probhat['r']='\u09b0';  //র
probhat['R']='\u09dc'; //ড়
probhat['t']='\u099f'; //ট
probhat['T']='\u09a0'; //ঠ
probhat['y']='\u098f'; //এ
probhat['Y']='\u0990'; //ঐ
probhat['u']='\u09c1'; // উ-কার
probhat['U']='\u0989';//উ
probhat['i']='\u09bf'; //ই-কার
probhat['I']='\u0987';//ই
probhat['o']='\u0993';//ও
probhat['O']='\u0994';//ঔ
probhat['p']='\u09aa'; //প
probhat['P']='\u09ab';//ফ
probhat['[']='\u09c7';// এ-কার
probhat['{']='\u09c8';//ঐ-কার
probhat[']']='\u09cb';// ও-কার
probhat['}']='\u09cc';//ঔ-কার
probhat['\\']='\u200C'; //ZWNJ
probhat['|']= '\u0965'; // ডাবল দাঁড়ি
//3rd line
probhat['a']='\u09be'; //আ কার
probhat['A']='\u0985'; // অ
probhat['s']='\u09b8'; //স
probhat['S']='\u09b7'; //ষ
probhat['d']='\u09a1'; // ড 
probhat['D']='\u09a2'; // ঢ 
probhat['f']='\u09a4'; // ত
probhat['F']='\u09a5'; //থ
probhat['g']='\u0997'; //গ
probhat['G']='\u0998'; //ঘ
probhat['h']='\u09b9'; //হ
probhat['H']='\u0983'; //ঃ
probhat['j']='\u099c';  // জ
probhat['J']='\u099d'; // ঝ
probhat['k']='\u0995'; //  ক
probhat['K']='\u0996'; // খ
probhat['l']='\u09b2'; //  ল
probhat['L']='\u0982'; // ং
probhat[';']=';'; // ;
probhat[':']=':'; // :
//4th line
probhat['z']='\u09df';// য়
probhat['Z']='\u09af'; //য
probhat['x']='\u09b6'; //শ
probhat['X']='\u09dd'; //ঢ়
probhat['c']='\u099a'; //চ
probhat['C']='\u099b'; // ছ
probhat['v']='\u0986'; // আ
probhat['V']='\u098b'; // ঋ
probhat['b']='\u09ac'; // ব
probhat['B']='\u09ad'; // ভ
probhat['n']='\u09a8'; // ন
probhat['N']='\u09a3'; // ণ
probhat['m']='\u09ae'; //ম
probhat['M']='\u0999'; //ঙ 
probhat[',']=','; //  কমা
probhat['<']='\u09c3'; // ঋ কার
probhat['.']='\u0964'; // দাঁড়ি
probhat[".."] = '\u0965'; // ডাবল দাঁড়ি  This key is modified
probhat['>']='\u0981'; //  ঁ
probhat['/']='\u09cd'; //হসন্ত
probhat['?']='?';  // ?
//probhat['r/Z']=probhat['r']+'\u200C'+'\u09CD'+'\u09AF';	
//
var carry = '';  //This variable stores each keystrokes
var old_len =0; //This stores length parsed bangla charcter
var ctrlPressed=false;
var first_letter = false;
var carry2="";

isIE=document.all? 1:0;
var switched=false;

function checkKeyDown(ev)
{
	//just track the control key
	var e = (window.event) ? event.keyCode : ev.which;
	//check ctrl key  down
	if (e=='17')
	{
		ctrlPressed = true;
	}
}

function checkKeyUp(ev)
{
	//just track the control key
	var e = (window.event) ? event.keyCode : ev.which;
	if (e=='17')
	{
		ctrlPressed = false;
		//alert(ctrlPressed);
	}

}
function parseProbhat(evnt)
{
	// main probhat parser
	var t = document.getElementById(activeta); // the active text area
	var e = (window.event) ? event.keyCode : evnt.which; // get the keycode
	
	if (e=='112')      //pressing ctrl+ p to switch to probhat layout
	{
		//switch the keyboard mode
		if(ctrlPressed){
			switched = !switched;			
			return true;
		}
	}
	if (switched) return true;	
	if(ctrlPressed)
	{
		// user is pressing control, so leave the parsing
		e=0; 
	}

	var char_e = String.fromCharCode(e); // get the character equivalent to this keycode
	
	if(e==8 || e==32)
	{
		// if space is pressed we have to clear the carry. otherwise there will be some malformed conjunctions
		carry = " ";	
		old_len = 1;
		return;
	}

	lastcarry = carry;
	carry += "" + char_e;	 //append the current character pressed to the carry
	
	bangla = parseProbhatCarry(carry); // get the combined equivalent
	tempBangla = parseProbhatCarry(char_e); // get the single equivalent
	
	if (tempBangla == ".." || bangla == "..") //that means it has next sibling
	{
		return false;
	}
	
	if (char_e=="/")
	{
		if(carry=="//")
		{
			// check if it is a / sign
			insertJointAtCursor("/",old_len);
			old_len=1;
			return false;
		}			
		//otherwise this is a simple joiner
		insertAtCursor("\u09CD");old_len = 1;
		carry2=carry;
		carry="/";				
		return false;
	
	}
	else if(old_len==0) //first character
	{
		// this is first time someone press a character
		insertJointAtCursor(bangla,1);
		old_len=1;
		return false;
		
	}
	else if(char_e=='Z' && carry2=="r/")//force Za-phola after Ra
	{	
		insertJointAtCursor('\u200d'+probhat['/']+probhat['Z'],1);
		old_len=1;	
		return false;
	}
	else if((bangla == "" && tempBangla !="")) //that means it has no joint equivalent
	{
		
		// there is no joint equivalent - so show the single equivalent. 
		bangla = tempBangla;
		if (bangla=="")
		{
			// there is no available equivalent - leave as is
			carry ="";
			return;
		}
		
		else
		{
			// found one equivalent
			carry = char_e;
			insertAtCursor(bangla);
			old_len = bangla.length;
			return false;
		}
	}
	else if(bangla!="")//joint equivalent found 
	{
		// we have found some joint equivalent process it
		
		insertJointAtCursor(bangla, old_len);
		old_len = bangla.length;
		return false;
	}
}
function parseProbhatCarry(code)
    {
	//this function just returns a bangla equivalent for a given keystroke
	//or a conjunction
	//just read the array - if found then return the bangla eq.
	//otherwise return a null value
        if (!probhat[code])  //Oh my god :-( no bangla equivalent for this keystroke

        {
			return ''; //return a null value
        }
        else
        {
            return (probhat[code]);  //voila - we've found bangla equivalent
        }

    }
    function insertAtCursor(myValue) {
	/**
	 * this function inserts a character at the current cursor position in a text area
	 * many thanks to alex king and phpMyAdmin for this cool function
	 * 
	 * This function is originally found in phpMyAdmin package and modified by Hasin Hayder to meet the requirement
	 */
	var myField = document.getElementById(activeta);
	if (document.selection) {		
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		sel.collapse(true);
		sel.select();
	}
	//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == 0) {
		
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var scrollTop = myField.scrollTop;
		startPos = (startPos == -1 ? myField.value.length : startPos );
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
		myField.scrollTop = scrollTop;
	} else {
		var scrollTop = myField.scrollTop;
		myField.value += myValue;
		myField.focus();
		myField.scrollTop = scrollTop;
	}
}

function insertJointAtCursor(myValue, len) {
	/**
	 * this function inserts a conjunction and removes previous single character at the current cursor position in a text area
	 * 
	 * This function is derived from the original one found in phpMyAdmin package and modified by Hasin to meet our need
	 */
	//alert(len);
	var myField = document.getElementById(activeta);
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		if (myField.value.length >= len){  // here is that first conjunction bug in IE, if you use the > operator
			sel.moveStart('character', -1*(len));   
			//sel.moveEnd('character',-1*(len-1));
		}
		sel.text = myValue;
		sel.collapse(true);
		sel.select();
	}
	//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == 0) {
		myField.focus();
		var startPos = myField.selectionStart-len;
		var endPos = myField.selectionEnd;
		var scrollTop = myField.scrollTop;
		startPos = (startPos == -1 ? myField.value.length : startPos );
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
		myField.scrollTop = scrollTop;
	} else {
		var scrollTop = myField.scrollTop;
		myField.value += myValue;
		myField.focus();
		myField.scrollTop = scrollTop;
	}
	//document.getElementById("len").innerHTML = len;
}

function makeProbhatEditor(textAreaId)
{
	activeTextAreaInstance = document.getElementById(textAreaId);
	activeTextAreaInstance.onkeypress = parseProbhat; 
	activeTextAreaInstance.onkeydown = checkKeyDown; 
	activeTextAreaInstance.onkeyup = checkKeyUp;
	activeTextAreaInstance.onfocus = function(){activeta=textAreaId;};
}
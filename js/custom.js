var activeta = 'message';
function storeCaret(textEl)
{
	if (textEl.createTextRange)
	{
		textEl.caretPos = document.selection.createRange().duplicate();
	}
}


function insertAtCursor(myValue) {
    /**
     * this function inserts a character at the current cursor position in a text area
     * many thanks to alex king and phpMyAdmin for this cool function		  
     * This function is originally found in phpMyAdmin package and modified by Hasin Hayder(http://hasin.wordpress.com) to meet the requirement	 
     */
    var myField = document.getElementById('message');
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
        startPos = (startPos == -1 ? myField.value.length : startPos);
        myField.value = myField.value.substring(0, startPos) +
            myValue +
            myField.value.substring(endPos, myField.value.length);
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

function makeVirtualEditor(textAreaId) {
    activeTextAreaInstance = document.getElementById(textAreaId);
    activeTextAreaInstance.onfocus = function () {
        activeta = textAreaId;
    };
}

$(document).ready(function() { 
    makeUnijoyEditor('message');
    $('#message').focus();
 });

 function makeEnglish(){
     activeTextAreaInstance.onkeypress = null;
     activeTextAreaInstance.onkeydown = null;
     activeTextAreaInstance.onkeyup = null;
 }
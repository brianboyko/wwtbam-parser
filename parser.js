var fs = require('fs');

/*
Data will be an array of question objects. 
*/

var dataParser = function(data) {
  var qArray = [];
  var slow = 0;
  var buffer = '';
  var question = {
    'question': '',
    'A': '',
    'B': '',
    'C': '',
    'D': '',
    'answer': ''
  };
  for (var i = 0; i <= data.length; i++) {
    //edge case for last question. 
    if (i === data.length) {
      qArray.push(question); // push the last question
      qArray.shift(); // we start by pushing an empty question, this gets rid of it. 
      return qArray; // ending function here.
    }

    if (data.charAt(i) === '\n') {
      // read the last line.
      buffer = data.slice(slow, i);
      slow = i + 1; // next buffer will start at new line. 
      //so, when we have a new buffer
      //is it a question?
      if (buffer.charAt(1) !== '.') {
        // we have a new question, so push the old one. 
        // remember we will shift out the first "empty" question later.
        qArray.push(question);
          question = {
            'question': '',
            'A': '',
            'B': '',
            'C': '',
            'D': '',
            'answer': ''
          };
        question.question = buffer;
      } else {
        //is it an answer?
        //if it's the right answer, it'll have an asterisk
        if (buffer.charAt(buffer.length - 1) === '*') {
          question.answer = buffer.charAt(0);
          buffer = buffer.slice(0, -2);
        }
        // in any case, we'll store the answers at the key. 
        question[buffer.charAt(0)] = buffer.slice(3);
      } // end if/else for question/answer
    } // end if for buffer
  } // end for loop
}; // end function. 

fs.readFile('unformatted.txt', function(err, data) {
  if (err) throw err;
  var output = dataParser(data.toString());
  fs.writeFileSync('questions.json', JSON.stringify(output));
  console.log('done');
});
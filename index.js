var fs = require("fs");
var contents = fs.readFileSync("nfl6.json");
var writeFile = require('write');

var json = JSON.parse(contents);
var entries = [];
var entry;
var story = "";

var prefixes = [
    "okay. so, then: ",
    "hmm. I'm not sure about that. ",
    "oh. right. so I guess my question then is: ",
    "but ",
    "yes, but ", 
    "that makes sense I think. so ",
    "yes, I guess that makes sense. so then ", 
    "I understand. so I guess my follow up question is: ",
    "wait, I'm confused. ",
    "I disagree. ",
    "wait, what? okay, let me ask another way: ",
    "let me re-phrase this. ", 
    "but doctor, ",
    "alright. I'm embarassed to ask this but ",
    "really? oh. well in that case ",
    "ah, that's good to know. so based on that, ", 
    "no way. okay. so ",
    "I was hoping you'd say that. ",
    "I knew you'd say that. okay, so ",
    "okay doc. ",
    "alright. ",
    "makes sense. ",
    "that makes no sense! ",
    "what do you mean? let me re-phrase: ",
    "riiiiiight. ", 
    "I'm not sure I follow. ", 
    "I thought that might be the case. ", 
    "I knew it. ", 
    "I suspected as much. ", 
    "So my hunch was correct. Huh. ", 
    "That is unbelievable. so then, ",
    "That's what I read online too. "
]

var answer_prefixes = [
    "in my opinion, ",
    "speaking as a professional, ",
    "it seems to me that ",
    "ah, well essentially ", 
    "hmm. good question. I think that ",
    "the answer is simple: ",
    "easy: ",
    "that's a tricky one. ",
    "let me think... ah: ",
    "hmm. ",
    "the answer is that ",
    "well you see, ",
    "this is a classic question. ",
    "",
    "well, ",
    "to be blunt, ",
    "simply put, ",
    "realistically, ",
    "I think that ", 
    "in my opinion, ",
    "for me, ",
    "erm. well... ", 
    "I'm not sure, but ",
    "I honestly don't know. ", 
    "I'm asked this a lot. ", 
    "I get this one a lot. ",
    "A common question. ", 
    "speaking honestly: ", 
    "Ah, I know this one. ",
    "I'm not sure, but ", 
    "Hmm. I think ", 
    "Let me think... ",
    "Hmmmm. ",
    "Ahha, yes, the answer is that ", 
    "I believe that ", 
    "You see, ", 
    "Hm. I think "
]

// isolate the 'health' items from the data set
for(var i = 0; i < json.length; i++ ) {
    entry = json[i];

    if(entry.main_category == "Health" /*|| entry.main_category == "Society & Culture"*/) {
        entries.push(entry)
    }
}

// begin writing!
var storyLoops = 1700;

// intro
addLine("DOCTOR: what would you like to talk about today? \n")

// actual sections
for(var i = 0; i < storyLoops; i++) {
    if(i == 0) 
        addLine("PATIENT: " + getRand(entries).question.toLowerCase())
    else 
        addLine("PATIENT: " + getRand(prefixes) + getRand(entries).question.toLowerCase())

    addLine("DOCTOR: " + getRand(answer_prefixes) + getRand(entries).nbestanswers[0].toLowerCase().split(".")[0] + ".\n")
}

// outro
addLine("PATIENT: OK, look, this is going nowhere. Goodbye. \n")

// print the sucker out
console.log(story);

writeFile('story.txt', story, function(err) {
    if (err) console.log(err);
  });
  

//--------------- utils
function getRand(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function addLine(line) {
    story += line + "\n";
}
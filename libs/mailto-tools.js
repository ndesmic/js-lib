
const joinString = value => 
    Array.isArray(value) ? value.join() : value;  

export function open(email){
    let mailto = "mailto:";
    mailto += joinString(email.to) + "?";   
    if(email.cc){
        mailto += "cc=" + joinString(email.cc) + "&";
    }
    if(email.bcc){
        mailto += "bcc=" + joinString(email.bcc) + "&";
    }
    if(email.subject){
        mailto += "subject=" + encodeURIComponent(email.subject) + "&";
    }
    if(email.body){
        mailto += "body=" + encodeURIComponent(email.body);
    }
    if(StringTools.stringEndsWith(mailto, "&") || StringTools.stringEndsWith(mailto, "?")){
        mailto = stringTrimEnd(mailto, 1);
    }
    window.open(mailto);
}
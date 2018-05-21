//id或class选择器$("elem") 
function $(strExpr) {
    var idExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    var classExpr = /^(?:\s*(<[\w\W]+>)[^>]*|.([\w-]*))$/;
    if (idExpr.test(strExpr)) {
        var idMatch = idExpr.exec(strExpr);
        return document.getElementById(idMatch[2]);
    } else if (classExpr.test(strExpr)) {
        var classMatch = classExpr.exec(strExpr);
        var allElement = document.getElementsByTagName("*");
        var ClassMatch = [];
        for (var i = 0, l = allElement.length; i < l; i++) {
            if (allElement[i].className.match(new RegExp("(\\s|^)" + classMatch[2] + "(\\s|$)"))) {
                ClassMatch.push(allElement[i]);
            }
        }
        return ClassMatch;
    }
}
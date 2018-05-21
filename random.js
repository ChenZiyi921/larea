function ranStr(n) {
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIZKLMNOPQRSTUVWXYZ0123456789";
    var ranS = "";
    for (var i = 0; i < n; i++) {
        var s = Math.floor(Math.random() * (str.length - 1));
        ranS += str.charAt(s);
    }
    return ranS;
}

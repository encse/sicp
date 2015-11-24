var Parser = (function () {
    function Parser() {
        this.regexId = /^[_a-zA-Z][_a-zA-Z0-9]*/;
        this.regexNumber = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
        this.regexString = /^"([^\\\"]+|\\.)*"/;
        this.regexId.compile();
        this.regexNumber.compile();
        this.regexString.compile();
    }
    Parser.prototype.parse = function (st) {
        console.log(this.getTokens(st));
        return null;
    };
    Parser.prototype.getTokens = function (st) {
        var tokens = [];
        while (st.length > 0) {
            var ch = st[0];
            var token = void 0;
            if (ch === "(")
                token = new Token(TokenKind.LParen, "(");
            else if (ch === ")")
                token = new Token(TokenKind.RParen, "(");
            else if (ch === "'")
                token = new Token(TokenKind.Quote, "'");
            else if (this.regexId.test(st))
                token = new Token(TokenKind.Id, this.regexId.exec(st)[0]);
            else if (this.regexNumber.test(st))
                token = new Token(TokenKind.NumberLit, this.regexNumber.exec(st)[0]);
            else if (this.regexString.test(st))
                token = new Token(TokenKind.StringLit, this.regexNumber.exec(st)[0]);
            else if (this.isWhiteSpace(ch))
                token = new Token(TokenKind.WhiteSpace, ch);
            else
                throw "invalid token at '" + st + "'";
            tokens.push(token);
        }
        return tokens;
    };
    Parser.prototype.getId = function (st, ich) {
        var res = "\"";
        var esc = false;
        while (ich < st.length) {
            if (st[ich] === "\\")
                esc = true;
            else
                esc = false;
            res += st[ich];
            if (!esc && st[ich] === "\"")
                return new Token(TokenKind.StringLit, res);
        }
        return null;
    };
    Parser.prototype.getStringLit = function (st, ich) {
        var res = "\"";
        var esc = false;
        while (ich < st.length) {
            if (st[ich] === "\\")
                esc = true;
            else
                esc = false;
            res += st[ich];
            if (!esc && st[ich] === "\"")
                return new Token(TokenKind.StringLit, res);
        }
        return null;
    };
    Parser.prototype.isWhiteSpace = function (ch) { return " \r\n\t".indexOf(ch) >= 0; };
    return Parser;
})();
var TokenKind;
(function (TokenKind) {
    TokenKind[TokenKind["WhiteSpace"] = 0] = "WhiteSpace";
    TokenKind[TokenKind["LParen"] = 1] = "LParen";
    TokenKind[TokenKind["RParen"] = 2] = "RParen";
    TokenKind[TokenKind["Id"] = 3] = "Id";
    TokenKind[TokenKind["NumberLit"] = 4] = "NumberLit";
    TokenKind[TokenKind["Quote"] = 5] = "Quote";
    TokenKind[TokenKind["StringLit"] = 6] = "StringLit";
})(TokenKind || (TokenKind = {}));
var Token = (function () {
    function Token(kind, st) {
        this.kind = kind;
        this.st = st;
        this.kind = kind;
        this.st = st;
    }
    return Token;
})();
//# sourceMappingURL=parser.js.map